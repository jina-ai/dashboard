import { EventEmitter } from "events";
import _ from "lodash";
import { nanoid } from "nanoid";
import { Constants, Dispatcher } from "./";
import { parseYAML, formatForFlowchart, formatSeconds } from "../helpers";
import api from "./api";
import logger from "../logger";
import propertyList from "../data/podProperties.json";
import getSidebarNavItems from "../data/sidebar-nav-items";
import exampleFlows from "../data/exampleFlows";

const HIDE_BANNER_TIMEOUT = 5000;
//const TASK_UPDATE_INTERVAL = 500;

function getExampleFlows() {
  const flows: LooseObject = {};

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
  const storedFlows = localStorage.getItem("userFlows");
  const userFlows = storedFlows ? JSON.parse(storedFlows) : null;
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

function getInitialStore(): LooseObject {
  const initialStore: LooseObject = {
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
  return initialStore;
}

let _store: any = getInitialStore();
let _updateChartInterval: any;
let _updateTaskInterval: any;
let _bannerTimeout: any;

if (window.location.hostname === "localhost") logger.enable();

type DispatchProps = {
  actionType: string;
  payload: any;
};

interface LooseObject {
  [key: string]: any;
}

class StoreBase extends EventEmitter {
  constructor() {
    super();
    Dispatcher.register(this.registerActions);
    this.init();
    (window as any).peakLogs = this.getLogs;
    (window as any).peakStore = () => console.log(_store);
  }
  registerActions = ({ actionType, payload }: DispatchProps) => {
    switch (actionType) {
      case Constants.TOGGLE_SIDEBAR:
        this.toggleSidebar();
        break;
      case Constants.SHOW_MODAL:
        this.showModal(payload);
        break;
      case Constants.SHOW_BANNER:
        this.showBanner(...(payload as [string, string]));
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
        this.reconnect();
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

    await this.initFlowChart();
    this.initHub();
    this.initUser();

    this.emit("update-ui");
    this.emit("update-settings");
  };

  clearIntervals = () => {
    if (_updateChartInterval) clearInterval(_updateChartInterval);
    if (_updateTaskInterval) clearInterval(_updateTaskInterval);
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

    let flows: LooseObject = {};
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

  handleLogConnectionStatus = (status: string, message: string) => {
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

  handleNewTaskEvent = (message: { data: any }) => {
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
        .map((obj: any) => obj.process)
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
        .sort((a: any, b: any) => b.sent + b.received - (a.sent + a.received))
        .slice(0, 20);
      _store.taskData.bytes = _store.taskData.bytes
        .sort((a: any, b: any) => b.sent + b.received - (a.sent + a.received))
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

  reconnect() {
    this.init();
  }

  toggleSidebar() {
    _store.menuVisible = !_store.menuVisible;
    this.emit("update-ui");
  }

  showLogAtIndex = (logIndex: number) => {
    if (!logIndex || !_store.logs[logIndex]) return;
    _store.logIndex = logIndex;
    this.emit("show-log");
  };

  showPodByLabel = (label: string) => {
    let selected: LooseObject = {};
    let x = 0;
    let y = 0;
    Object.entries(_store.flowchart.nodes).forEach(
      ([key, value]: [string, any]) => {
        if (value.label === label) {
          selected.id = key;
          selected.type = "node";
          x = value.position.x * -1 + 40;
          y = value.position.y * -1 + 100;
        }
      }
    );
    _store.flowchart.selected = selected;
    _store.flowchart.offset = { x, y };
    this.emit("update-flowchart");
    window.location.hash = "#/flow";
  };

  importCustomYAML = (customYAML?: string) => {
    logger.log("importCustomYAML - customYAML", customYAML);
    this.createNewFlow(customYAML);
    this.closeModal();
    this.emit("update-flowchart");
  };

  loadFlow = (flowId: string) => {
    _store.selectedFlow = flowId;
    this.emit("update-flowchart");
  };

  updateFlow = (newFlow: any) => {
    _store.flows[_store.selectedFlow].flow = newFlow;
    this.saveFlowsToStorage();
    this.emit("update-flowchart");
  };

  createNewFlow = (customYAML?: string) => {
    let prefixString = "Custom Flow";

    let userFlows = Object.values(_store.flows).filter((flow: any) =>
      flow.name.startsWith(prefixString)
    );

    const flowNumbers = userFlows
      .map((f: any) => parseInt(f.name.substring(prefixString.length)) || 0)
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

  deleteFlow = (flowId: string) => {
    _store.flows = _.omit(_store.flows, flowId);

    const nonExampleFlows = Object.entries(_store.flows).filter(
      ([id, flow]: [string, any]) => flow.type !== "example"
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
    let toSave: LooseObject = {};
    const { flows } = _store;
    Object.entries(flows).forEach(([id, flow]: [string, any]) => {
      if (flow.type === "user-generated") toSave[id] = flow;
    });
    localStorage.setItem("userFlows", JSON.stringify(toSave));
  };

  saveSettings = (settings: LooseObject) => {
    logger.log("saveSettings - settings", settings);
    Object.keys(settings).forEach((key) => {
      localStorage.setItem(`preferences-${key}`, settings[key]);
    });
    setTimeout(this.init, 100);
  };

  postRating = async ({ imageId, stars }: { imageId: string; stars: any }) => {
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

  postReview = async ({
    imageId,
    content,
  }: {
    imageId: string;
    content: any;
  }) => {
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

  searchHub = async ({
    category,
    q,
    sort,
  }: {
    category: string;
    q: string;
    sort: string;
  }) => {
    const images = await api.searchHub(category, q, sort);
    _store.hub = images;
    this.emit("update-hub");
  };

  showBanner = (message: string, theme: string) => {
    if (_bannerTimeout) clearTimeout(_bannerTimeout);
    _store.banner = { message: String(message), theme };
    _bannerTimeout = setTimeout(this.hideBanner, HIDE_BANNER_TIMEOUT);
    this.emit("update-ui");
  };

  hideBanner = () => {
    _store.banner = false;
    this.emit("update-ui");
  };

  showError = (message: string) => {
    this.showBanner(message, "error");
  };

  showModal = (data: { modal: string; modalParams: any }) => {
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

  getHubImage = async (imageId: string) => {
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

export const Store = new StoreBase();
