import { EventEmitter } from "events";
import _ from "lodash";
import Dispatcher from "./dispatcher";
import { nanoid } from "nanoid";
import Constants from "./constants";
import { parseYAML, formatForFlowchart, formatSeconds } from "../helpers";
import api from "./api";
import logger from "../logger";
import propertyList from "../data/podProperties.json";
import getSidebarNavItems from "../data/sidebar-nav-items";
import exampleFlows from "../data/exampleFlows";
import { transformLog } from "./tranformLog";

let _store;

const HIDE_BANNER_TIMEOUT = 5000;
const TASK_UPDATE_INTERVAL = 500;
const CHART_LEVELS = [
  "INFO",
  "SUCCESS",
  "WARNING",
  "ERROR",
  "CRITICAL",
  "DEBUG",
];

function getExampleFlows() {
  const flows = {};

  Object.entries(exampleFlows).forEach(([id, flow]) => {
    const parsed = parseYAML(flow.yaml);
    let canvas;
    try {
      canvas = parsed.data.with.board.canvas;
    } catch (e) {
      canvas = {};
    }
    const formatted = formatForFlowchart(parsed.data.pods, canvas);
    flows[id] = {
      ...flow,
      flow: formatted,
    };
  });

  return flows;
}

function getUserFlows() {
  const userFlows = JSON.parse(localStorage.getItem("userFlows"));
  return _.isEmpty(userFlows)
    ? {
        _userFlow: {
          name: "Custom Flow 1",
          type: "user-generated",
          flow: getInitialFlow(),
        },
      }
    : userFlows;
}

function getInitialFlow() {
  return {
    selected: {},
    hovered: {},
    scale: 1,
    nodes: {
      gateway: {
        id: "gateway",
        label: "gateway",
        ports: {
          outPort: {
            id: "outPort",
            type: "output",
          },
        },
        properties: {},
        position: { x: 629, y: 72 },
      },
    },
    links: {},
    offset: { x: 0, y: 0 },
  };
}

function getInitialLevelOccurences() {
  let occurences = {
    lastLog: 0,
    levels: {},
  };
  CHART_LEVELS.forEach((level) => {
    occurences.levels[level] = 0;
  });
  return occurences;
}

function getInitialStore() {
  return {
    settings: {
      host: localStorage.getItem("preferences-host") || "http://localhost",
      port: localStorage.getItem("preferences-port") || 5000,
      log: localStorage.getItem("preferences-log") || "/stream/log",
      profile: localStorage.getItem("preferences-profile") || "/stream/profile",
      yaml: localStorage.getItem("preferences-yaml") || "/data/yaml",
      shutdown:
        localStorage.getItem("preferences-shutdown") || "/action/shutdown",
      ready: localStorage.getItem("preferences-ready") || "/status/ready",
    },
    images: {},
    hub: [],
    banner: false,
    connected: false,
    loading: true,
    modal: false,
    menuVisible: false,
    navItems: getSidebarNavItems(),
    flows: {
      ...getUserFlows(),
      ...getExampleFlows(),
    },
    selectedFlow: "_userFlow",
    logs: [],
    logSources: {},
    logLevels: {},
    logLevelOccurences: {},
    logIndex: false,
    summaryCharts: {},
    processes: {},
    taskData: {
      qps: {
        current: 0,
        history: new Array(30).fill(0),
      },
      elapsed: {
        task_name: "No Current Task",
        seconds: "0s",
      },
      progress: {
        currentRequest: 0,
        bar_len: 0,
        num_bars: 0,
      },
      speed: {
        current: 0,
        unit: "units",
        history: new Array(30).fill(0),
      },
      lastUpdateChart: new Date(),
      messages: [],
      bytes: [],
    },
    selectedNode: null,
    modalParams: {},
    currentTab: "logStream",
  };
}

if (window.location.hostname === "localhost") logger.enable();

class Store extends EventEmitter {
  constructor() {
    super();
    Dispatcher.register(this.registerActions);
    this.init();
    window.peakLogs = this.getLogs;
    window.peakStore = () => console.log(_store);
  }

  registerActions = ({ actionType, payload }) => {
    switch (actionType) {
      case Constants.TOGGLE_SIDEBAR:
        this.toggleSidebar();
        break;
      case Constants.SHOW_MODAL:
        this.showModal(payload);
        break;
      case Constants.SHOW_BANNER:
        this.showBanner(...payload);
        break;
      case Constants.IMPORT_CUSTOM_YAML:
        this.importCustomYAML(payload);
        break;
      case Constants.CLOSE_MODAL:
        this.closeModal();
        break;
      case Constants.SHOW_LOG_AT_INDEX:
        this.showLogAtIndex(payload);
        break;
      case Constants.SAVE_SETTINGS:
        this.saveSettings(payload);
        break;
      case Constants.RECONNECT:
        this.reconnect(payload);
        break;
      case Constants.POST_RATING:
        this.postRating(payload);
        break;
      case Constants.POST_REVIEW:
        this.postReview(payload);
        break;
      case Constants.SEARCH_HUB:
        this.searchHub(payload);
        break;
      case Constants.LOG_OUT:
        this.logOut();
        break;
      case Constants.LOAD_FLOW:
        this.loadFlow(payload);
        break;
      case Constants.SHOW_POD_IN_FLOW:
        this.showPodByLabel(payload);
        break;
      case Constants.CREATE_NEW_FLOW:
        this.createNewFlow();
        break;
      case Constants.DUPLICATE_FLOW:
        this.createNewFlow(payload);
        break;
      case Constants.UPDATE_FLOW:
        this.updateFlow(payload);
        break;
      case Constants.DELETE_FLOW:
        this.deleteFlow(payload);
        break;
      default:
    }
  };

  init = async () => {
    this.clearIntervals();
    _store = getInitialStore();

    console.log("store:", _store);

    await this.initFlowChart();
    this.initLogStream();
    this.initCharts();
    this.initHub();
    this.initUser();

    this.emit("update-ui");
    this.emit("update-settings");
  };

  clearIntervals = () => {
    if (this.updateChartInterval) clearInterval(this.updateChartInterval);
    if (this.updateTaskInterval) clearInterval(this.updateTaskInterval);
  };

  initFlowChart = async () => {
    let flow;

    try {
      let str = await api.getYAML(_store.settings);
      flow = parseYAML(str);
    } catch (e) {
      logger.log("initFlowChart - parseYAML[API] ERROR", e);
      return;
    }

    let canvas;
    try {
      canvas = flow.data.with.board.canvas;
    } catch (e) {
      canvas = {};
    }

    logger.log("initFlowChart - flow", flow);
    logger.log("initFlowChart - canvas", canvas);

    const parsed = formatForFlowchart(flow.data.pods, canvas);
    parsed.with = flow.data.with;

    logger.log("initFlowChart - parsed", parsed);

    let flows = {};
    flows.connectedFlow = {
      flow: parsed,
      name: "Network Flow",
      type: "remote",
    };
    _store.flows = { ...flows, ..._store.flows };
    _store.selectedFlow = "connectedFlow";

    this.emit("update-ui");
    this.emit("update-flowchart");
  };

  initLogStream = () => {
    api.connect(
      _store.settings,
      this.handleLogConnectionStatus,
      this.handleNewLog,
      this.handleNewTaskEvent
    );
    this.updateTaskInterval = setInterval(
      () => this.emit("update-task"),
      TASK_UPDATE_INTERVAL
    );
  };

  handleLogConnectionStatus = (status, message) => {
    logger.log("handleLogConnectionStatus - status", status);
    logger.log("handleLogConnectionStatus - message", message);
    _store.loading = false;
    if (status === "connected") {
      _store.connected = true;
      return this.showBanner(message, "success");
    } else {
      _store.connected = false;
    }
    this.emit("update-ui");
  };

  handleNewLog = (message) => {
    const { data } = message;
    const log = transformLog(data);

    log.unixTime = parseInt(log.created);
    log.timestamp = new Date(log.unixTime * 1000);
    log.formattedTimestamp = log.timestamp.toLocaleString();
    log.idx = _store.logs.length;
    const { process, name, levelname, unixTime } = log;

    _store.logs.push(log);
    _store.processes[process] = log.name;

    if (_store.logSources[name]) _store.logSources[name]++;
    else _store.logSources[name] = 1;

    if (_store.logLevels[levelname]) _store.logLevels[levelname]++;
    else _store.logLevels[levelname] = 1;

    if (!_store.logLevelOccurences[unixTime])
      _store.logLevelOccurences[unixTime] = getInitialLevelOccurences();

    _store.logLevelOccurences[unixTime].levels[levelname]++;
    _store.logLevelOccurences[unixTime].lastLog = log.idx;

    this.emit("update-logs");
  };

  handleNewTaskEvent = (message) => {
    const { data } = message;

    const event = data;

    const {
      task_name,
      process,
      bar_len,
      num_bars,
      elapsed,
      speed,
      speed_unit,
      bytes_recv,
      bytes_sent,
      msg_recv,
      msg_sent,
      num_reqs,
      qps,
    } = event;

    if (bar_len && num_bars) {
      _store.taskData.progress.currentRequest = num_reqs;
      _store.taskData.progress.bar_len = bar_len;
      _store.taskData.progress.num_bars = num_bars;
    }

    if (msg_recv && msg_sent) {
      let index = _store.taskData.messages
        .map((obj) => obj.process)
        .indexOf(process);
      let msgData = {
        process,
        sent: msg_sent,
        received: msg_recv,
        node: _store.processes[process],
      };
      let bytesData = {
        process,
        sent: bytes_sent,
        received: bytes_recv,
        node: _store.processes[process],
      };
      if (index < 0) {
        _store.taskData.messages.push(msgData);
        _store.taskData.bytes.push(bytesData);
      } else {
        _store.taskData.messages[index] = msgData;
        _store.taskData.bytes[index] = bytesData;
      }
      _store.taskData.messages = _store.taskData.messages
        .sort((a, b) => b.sent + b.received - (a.sent + a.received))
        .slice(0, 20);
      _store.taskData.bytes = _store.taskData.bytes
        .sort((a, b) => b.sent + b.received - (a.sent + a.received))
        .slice(0, 20);
      _store.taskData.lastUpdateChart = new Date();
    }

    if (qps) {
      _store.taskData.qps.current = parseFloat(qps).toFixed(1);
      _store.taskData.qps.history.push(parseFloat(qps).toFixed(3));
      _store.taskData.qps.history.shift();
    }

    if (speed && speed_unit) {
      _store.taskData.speed.unit = speed_unit;
      _store.taskData.speed.current = parseFloat(speed).toFixed(1);
      _store.taskData.speed.history.push(parseFloat(speed).toFixed(3));
      _store.taskData.speed.history.shift();
    }

    if (elapsed) {
      _store.taskData.elapsed.seconds = formatSeconds(parseInt(elapsed));
      _store.taskData.elapsed.task_name = `Task: ${task_name}`;
    }
  };

  initCharts = async () => {
    this.updateChartInterval = setInterval(this.updateSummaryCharts, 1000);
  };

  initHub = async () => {
    try {
      const images = await api.getImages();
      _store.hub = images;
    } catch (e) {
      _store.hub = false;
    }
    this.emit("update-hub");
  };

  initUser = async () => {
    const user = await api.getProfile();
    _store.user = user;
    this.emit("update-user");
  };

  updateSummaryCharts = () => {
    this.emit("update-summary-chart");
  };

  reconnect() {
    this.init();
  }

  toggleSidebar() {
    _store.menuVisible = !_store.menuVisible;
    this.emit("update-ui");
  }

  showLogAtIndex = (logIndex) => {
    if (!logIndex || !_store.logs[logIndex]) return;
    _store.logIndex = logIndex;
    this.emit("show-log");
  };

  showPodByLabel = (label) => {
    let selected = {};
    let x = 0;
    let y = 0;
    for (const [key, value] of Object.entries(_store.flowchart.nodes)) {
      if (value.label === label) {
        selected.id = key;
        selected.type = "node";
        x = value.position.x * -1 + 40;
        y = value.position.y * -1 + 100;
      }
    }
    _store.flowchart.selected = selected;
    _store.flowchart.offset = { x, y };
    this.emit("update-flowchart");
    window.location.hash = "#/flow";
  };

  importCustomYAML = (customYAML) => {
    logger.log("importCustomYAML - customYAML", customYAML);
    this.createNewFlow(customYAML);
    this.closeModal();
    this.emit("update-flowchart");
  };

  loadFlow = (flowId) => {
    _store.selectedFlow = flowId;
    this.emit("update-flowchart");
  };

  updateFlow = (newFlow) => {
    _store.flows[_store.selectedFlow].flow = newFlow;
    this.saveFlowsToStorage();
    this.emit("update-flowchart");
  };

  createNewFlow = (customYAML) => {
    let prefixString = "Custom Flow";

    let userFlows = Object.values(_store.flows).filter((flow) =>
      flow.name.startsWith(prefixString)
    );

    const flowNumbers = userFlows
      .map((f) => parseInt(f.name.substring(prefixString.length)) || 0)
      .sort((a, b) => a - b);

    const largestNumber = flowNumbers[flowNumbers.length - 1] || 0;

    const id = nanoid();

    let flow;

    if (customYAML) {
      const parsed = parseYAML(customYAML);
      let canvas;
      try {
        canvas = parsed.data.with.board.canvas;
      } catch (e) {
        canvas = {};
      }
      flow = formatForFlowchart(parsed.data.pods, canvas);
    } else flow = getInitialFlow();

    _store.flows[id] = {
      name: `${prefixString} ${largestNumber + 1}`,
      type: "user-generated",
      flow,
    };

    _store.selectedFlow = id;
    this.saveFlowsToStorage();
    this.emit("update-flowchart");
  };

  deleteFlow = (flowId) => {
    _store.flows = _.omit(_store.flows, flowId);

    const nonExampleFlows = Object.entries(_store.flows).filter(
      ([id, flow]) => flow.type !== "example"
    );

    if (_store.selectedFlow === flowId && nonExampleFlows.length) {
      _store.selectedFlow = nonExampleFlows[0][0];
    } else if (!nonExampleFlows.length) {
      _store.flows = {
        _userFlow: {
          name: "Custom Flow 1",
          type: "user-generated",
          flow: getInitialFlow(),
        },
        ..._store.flows,
      };
      _store.selectedFlow = "_userFlow";
    }

    this.saveFlowsToStorage();
    this.emit("update-flowchart");
  };

  saveFlowsToStorage = () => {
    let toSave = {};
    const { flows } = _store;
    Object.entries(flows).forEach(([id, flow]) => {
      if (flow.type === "user-generated") toSave[id] = flow;
    });
    localStorage.setItem("userFlows", JSON.stringify(toSave));
  };

  saveSettings = (settings) => {
    logger.log("saveSettings - settings", settings);
    Object.keys(settings).forEach((key) => {
      localStorage.setItem(`preferences-${key}`, settings[key]);
    });
    setTimeout(this.init, 100);
  };

  postRating = async ({ imageId, stars }) => {
    if (!_store.user) return (window.location.hash = "#/login");
    let result;
    try {
      result = await api.postRating(imageId, stars);
    } catch (e) {
      let error = String(e).includes("409") ? "Already Rated" : e;
      return this.showError(error);
    }
    if (result.error) this.showError(result.error);
    else if (result.data) {
      const image = result.data;
      _store.images[image.id] = image;
      this.showBanner("Rating successfully posted", "success");
    }
    this.emit("update-hub");
  };

  postReview = async ({ imageId, content }) => {
    if (!_store.user) {
      this.closeModal();
      return (window.location.hash = "#/login");
    }
    this.closeModal();
    let result;
    try {
      result = await api.postReview(imageId, content);
    } catch (e) {
      let error = String(e).includes("409") ? "Already Reviewed" : e;
      return this.showError(error);
    }
    if (result.error) this.showError(result.error);
    else if (result.data) {
      const image = result.data;
      _store.images[image.id] = image;
      this.showBanner("Review successfully posted", "success");
    }
    this.emit("update-hub");
  };

  logOut = async () => {
    await api.logOut();
    window.location.reload();
  };

  searchHub = async ({ category, q, sort }) => {
    const images = await api.searchHub(category, q, sort);
    _store.hub = images;
    this.emit("update-hub");
  };

  showBanner = (message, theme) => {
    if (this.bannerTimeout) clearTimeout(this.bannerTimeout);
    _store.banner = { message: String(message), theme };
    this.bannerTimeout = setTimeout(this.hideBanner, HIDE_BANNER_TIMEOUT);
    this.emit("update-ui");
  };

  hideBanner = () => {
    _store.banner = false;
    this.emit("update-ui");
  };

  showError = (message) => {
    this.showBanner(message, "error");
  };

  showModal = (data) => {
    const { modal, modalParams } = data;
    _store.modal = modal;
    _store.modalParams = modalParams || {};
    this.emit("update-ui");
  };

  closeModal = () => {
    _store.modal = false;
    _store.modalParams = {};
    this.emit("update-ui");
  };

  getMenuState() {
    return _store.menuVisible;
  }

  getSidebarItems() {
    return _store.navItems;
  }

  getCurrentTab = () => {
    return _store.currentTab;
  };

  getUser = () => {
    return _store.user;
  };

  getHubImages = () => {
    return _store.hub;
  };

  getHubImage = async (imageId) => {
    if (!_store.images[imageId]) {
      _store.images[imageId] = await api.getImage(imageId);
    }
    return _store.images[imageId];
  };

  getSettings = () => {
    return _store.settings;
  };

  getBanner = () => {
    return _store.banner;
  };

  getModal = () => {
    return _store.modal;
  };

  getModalParams = () => {
    return _store.modalParams;
  };

  getLogs = () => {
    return _store.logs;
  };

  getLogSources = () => {
    return _store.logSources;
  };

  getLogLevels = () => {
    return _store.logLevels;
  };

  getSummaryCharts = () => {
    return _store.summaryCharts;
  };

  getLogLevelCharts = (numSeconds = 60) => {
    const emptyItem = getInitialLevelOccurences();
    let chartData = [];
    let now = parseInt(new Date() / 1000);
    for (let i = now - numSeconds; i < now; i++) {
      chartData.push(
        _store.logLevelOccurences[i] ? _store.logLevelOccurences[i] : emptyItem
      );
    }
    return chartData;
  };

  getLogLevelOccurences = () => {
    return _store.logLevels;
  };

  getTaskData = () => {
    return _store.taskData;
  };

  getActivePanel = () => {
    const path = window.location.hash.substring(2, window.location.hash.length);
    if (path.startsWith("flow")) return "flow";
    if (path.startsWith("logs")) return "logs";
    if (path.startsWith("hub") || path.startsWith("package")) return "hub";
    if (path.startsWith("task")) return "task";
    return "neither";
  };

  getConnectionStatus = () => {
    return _store.connected;
  };

  isLoading = () => {
    return _store.loading;
  };

  getFlowchart = () => {
    return _store.flows[_store.selectedFlow];
  };

  getFlows = () => {
    return _store.flows;
  };

  getSelectedFlowId = () => {
    return _store.selectedFlow;
  };

  getAvailableProperties = () => {
    return propertyList;
  };

  getIndexedLog = () => {
    return _store.logIndex;
  };

  getStoreCopy = () => {
    return _.cloneDeep(_store);
  };
}

export default new Store();
