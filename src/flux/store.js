import { EventEmitter } from "events";
import Dispatcher from "./dispatcher";
import Constants from "./constants";
import { parseYAML, formatForFlowchart, formatSeconds } from "../helpers";
import api from "./api";
import propertyList from "../data/podProperties.json";
import getSidebarNavItems from "../data/sidebar-nav-items";
import exampleYAML from "../data/yaml";

let _store;

const HIDE_BANNER_TIMEOUT = 5000;
const NUM_CHART_ELEMENTS = 60;
const CHART_UPDATE_INTERVAL = 1000;
const TASK_UPDATE_INTERVAL = 500;
const CHART_LEVELS = [
  "INFO",
  "SUCCESS",
  "WARNING",
  "ERROR",
  "CRITICAL",
  "DEBUG",
];

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
    flowchart: {
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
    },
    logs: [],
    logSources: {},
    logLevels: {},
    occurences: {
      current: {},
      previous: {},
      lastLog: [],
    },
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
    modalParams: null,
    currentTab: "logStream",
  };
}

class Store extends EventEmitter {
  constructor() {
    super();
    Dispatcher.register(this.registerActions);
    this.init();
    window.peakLogs = this.getLogs;
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
      case Constants.LOAD_EXAMPLE:
        this.loadExample(payload);
        break;
      case Constants.SHOW_POD_IN_FLOW:
        this.showPodByLabel(payload);
        break;
      default:
    }
  };

  init = async () => {
    this.clearIntervals();
    _store = getInitialStore();

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

  initFlowChart = async (yamlSTRING) => {
    let flow;
    const { settings } = _store;
    const connectionString = `${settings.host}:${settings.port}${
      settings.yaml.startsWith("/") ? settings.yaml : "/" + settings.yaml
    }`;

    if (yamlSTRING) {
      flow = parseYAML(yamlSTRING);
    } else {
      try {
        let str = await api.getYAML(connectionString);
        flow = parseYAML(str);
      } catch (e) {
        return;
      }
    }
    let canvas;
    try {
      canvas = flow.data.with.board.canvas;
    } catch (e) {
      canvas = {};
    }
    const parsed = formatForFlowchart(flow.data.pods, canvas);
    parsed.with = flow.data.with;
    _store.flowchart = parsed;
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
    _store.loading = false;
    if (status === "connected") {
      _store.connected = true;
      return this.showBanner(message, "success");
    } else {
      _store.connected = false;
      return this.showBanner(message, "error");
    }
  };

  handleNewLog = (message) => {
    const { data } = message;

    const log = data;

    log.formattedTimestamp = new Date(log.created * 1000).toLocaleString();
    log.idx = _store.logs.length;

    _store.logs.push(log);
    _store.processes[log.process] = log.name;
    _store.logSources[log.name] = true;
    _store.logLevels[log.levelname] = true;

    if (CHART_LEVELS.includes(log.levelname)) {
      _store.occurences.current[log.levelname]++;
    }

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

  initCharts = () => {
    for (let i = 0; i < CHART_LEVELS.length; ++i) {
      let level = CHART_LEVELS[i];
      _store.occurences.current[level] = 0;
      _store.occurences.previous[level] = 0;
      _store.summaryCharts[level] = new Array(NUM_CHART_ELEMENTS).fill(0);
    }
    _store.occurences.lastLog = new Array(NUM_CHART_ELEMENTS).fill({});
    this.updateChartInterval = setInterval(
      this.updateSummaryCharts,
      CHART_UPDATE_INTERVAL
    );
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
    const { current, previous } = _store.occurences;
    for (let i = 0; i < CHART_LEVELS.length; ++i) {
      let level = CHART_LEVELS[i];
      const numLogs = current[level];
      const prevNum = previous[level];
      _store.summaryCharts[level].push(numLogs - prevNum);
      _store.summaryCharts[level].shift();
      _store.occurences.previous[level] = numLogs;
    }
    _store.occurences.lastLog.push(_store.logs.length - 1);
    _store.occurences.lastLog.shift();
    this.emit("update-summary-chart");
  };

  reconnect() {
    this.init();
  }

  toggleSidebar() {
    _store.menuVisible = !_store.menuVisible;
    this.emit("update-ui");
  }

  showLogAtIndex = (index) => {
    let logIndex = _store.occurences.lastLog[index];
    if (!logIndex) return;
    _store.logIndex = _store.occurences.lastLog[index];
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
    this.initFlowChart(customYAML);
    this.closeModal();
    this.emit("update-flowchart");
  };

  loadExample = (exampleName) => {
    const flow = exampleYAML[exampleName];
    this.initFlowChart(flow);
    this.emit("update-flowchart");
  };

  saveSettings = (settings) => {
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
    const { modal, params } = data;
    _store.modal = modal;
    _store.modalParams = params;
    this.emit("update-ui");
  };

  closeModal = () => {
    _store.modal = false;
    _store.modalParams = "";
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

  getOccurencesByName = () => {
    return _store.occurences.current;
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
    return _store.flowchart;
  };

  getAvailableProperties = () => {
    return propertyList;
  };

  getIndexedLog = () => {
    return _store.logIndex;
  };
}

export default new Store();
