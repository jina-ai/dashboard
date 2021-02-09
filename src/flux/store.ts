import { EventEmitter } from "events";
import _ from "lodash";
import { nanoid } from "nanoid";
import { Constants, Dispatcher, transformLog } from "./";
import { parseYAML, formatSeconds } from "../helpers";
import jinad from "./jinad";
import logger from "../logger";
import getSidebarNavItems from "../data/sidebar-nav-items";
import { HIDE_BANNER_TIMEOUT } from "../redux/global/global.constants";

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
    activeFlow: false,
    images: {},
    hub: [],
    banner: false,
    connected: false,
    loading: true,
    modal: false,
    menuVisible: false,
    navItems: getSidebarNavItems(),
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
      case Constants.START_FLOW:
        this.startFlow(payload);
        break;
      case Constants.STOP_FLOW:
        this.stopFlow();
        break;
      default:
    }
  };

  init = async () => {
    this.clearIntervals();
    _store = getInitialStore();

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
      let { flow: str } = await jinad.getFlow(_store.settings);
      flow = parseYAML(str);
    } catch (e) {
      logger.log("initFlowChart - parseYAML[API] ERROR", e);
      return;
    }

    logger.log("initFlowChart - flow", flow);

    this.emit("update-ui");
    this.emit("update-flowchart");
  };

  initJinaD = () => {
    jinad.connect(_store.settings, this.handleJinaDConnection);
  };

  handleJinaDConnection = (data: { connected: boolean; msg?: any }) => {
    const { connected, msg } = data;
    logger.log("handleLogConnectionStatus - connected", connected);
    logger.log("handleLogConnectionStatus - msg", msg);
    _store.loading = false;
    if (connected) {
      _store.connected = true;
      return this.showBanner(msg, "success");
    } else {
      _store.connected = false;
    }
    this.emit("update-ui");
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

  handleNewLog = (data: any) => {
    const log = transformLog(data, _store.logs.length);

    const { process, name, level, unixTime } = log;

    _store.logs.push(log);
    _store.processes[process] = log.name;

    if (_store.logSources[name]) _store.logSources[name]++;
    else _store.logSources[name] = 1;

    if (_store.logLevels[level]) _store.logLevels[level]++;
    else _store.logLevels[level] = 1;

    if (!_store.logLevelOccurences[unixTime])
      _store.logLevelOccurences[unixTime] = {};

    _store.logLevelOccurences[unixTime].levels[level]++;
    _store.logLevelOccurences[unixTime].lastLog = log.idx;

    this.emit("update-logs");
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

  startFlow = async (yamlSTR: string) => {
    const flowResult = await jinad.startFlow(yamlSTR);
    if (flowResult.status === "error")
      return this.showError(`Error starting flow`);

    const { flow_id } = flowResult;
    _store.activeFlow = flow_id;

    const flowInfoResult = await jinad.getFlow(flow_id);

    if (flowInfoResult.status === "error")
      return this.showError(`Error getting flow information`);

    const { workspace_id } = flowInfoResult.flow;
    _store.activeWorkspace = workspace_id;

    logger.log("store - startFlow - activeFlow: ", flow_id);
    logger.log("store - startFlow - activeWorkspace: ", workspace_id);

    this.showSuccess(`Flow successfully started\nFlowId: ${flow_id}`);
    setTimeout(this.startLogStream, 3000);
  };

  stopFlow = async () => {
    const flowId = _store.activeFlow;
    logger.log("store - stopFlow - flowId: ", flowId);
    const result = await jinad.terminateFlow(flowId);
    if (result.status === "success") {
      _store.activeFlow = false;
      this.showSuccess(`Flow successfully closed\nFlowId: ${flowId}`);
    } else {
      this.showError(`Could not close flow \nFlowId: ${flowId}`);
    }
  };

  startPod = async (podArgs: any) => {
    logger.log("store - startPod - podArgs: ", podArgs);
    const result = await jinad.startPod(podArgs);
    if (result.status === "success") {
      _store.activeFlow = false;
      this.showSuccess(`Pod successfully started`);
    } else {
      this.showError(`Could not start pod`);
    }
  };

  stopPod = async () => {
    const flowId = _store.activeFlow;
    logger.log("store - stopFlow - flowId: ", flowId);
    const result = await jinad.terminateFlow(flowId);
    if (result.status === "success") {
      _store.activeFlow = false;
      this.showSuccess(`Flow successfully closed\nFlowId: ${flowId}`);
    } else {
      this.showError(`Could not close flow \nFlowId: ${flowId}`);
    }
  };

  startLogStream = async () => {
    const flowId = _store.activeFlow;
    const workspaceId = _store.activeWorkspace;
    let callback = (result: any) => {
      logger.log("store - startLogStream - callback result: ", result);
    };
    const { logs } = await jinad.getLogs(workspaceId, flowId);
    logs.forEach((log: any) => {
      this.handleNewLog(log);
    });
    jinad.listenForLogs(
      workspaceId,
      flowId,
      _store.settings,
      callback,
      this.handleNewLog
    );
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

  showSuccess = (message: string) => {
    this.showBanner(message, "success");
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

  getActiveFlow = () => {
    return _store.activeFlow;
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

  getIndexedLog = () => {
    return _store.logIndex;
  };

  getStoreCopy = () => {
    return _.cloneDeep(_store);
  };
}

export const Store = new StoreBase();
