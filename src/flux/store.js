import { EventEmitter } from "events";
import Dispatcher from "./dispatcher";
import Constants from "./constants";
import { parseYAML, formatForFlowchart } from "../helpers";
import api from "./api";
import propertyList from '../data/properties.json';
import getSidebarNavItems from "../data/sidebar-nav-items";

const HIDE_BANNER_TIMEOUT = 5000;

let _store = getInitialStore();

const NUM_CHART_ELEMENTS = 60;
const CHART_UPDATE_INTERVAL = 1000;
const CHART_LEVELS = ['INFO', 'SUCCESS', 'ERROR', 'CRITICAL']

function getInitialStore() {
  return {
    settings: {
      host: localStorage.getItem('preferences-host') || 'http://localhost',
      port: localStorage.getItem('preferences-port') || 5000,
      log: localStorage.getItem('preferences-log') || '/log/stream',
      profile: localStorage.getItem('preferences-profile') || '/stream/profile',
      yaml: localStorage.getItem('preferences-yaml') || '/data/yaml',
      shutdown: localStorage.getItem('preferences-shutdown') || '/action/shutdown',
      ready: localStorage.getItem('preferences-ready') || '/status/ready',
    },
    banner: false,
    connected: false,
    loading: true,
    modal: false,
    menuVisible: false,
    navItems: getSidebarNavItems(),
    flowchart: {
      selected:{},
      hovered:{},
      nodes:{},
      links:{},
      offset:{x:0,y:0},
    },
    logs: {
      all: [],
    },
    logSources: {},
    occurences: {
      current: {},
      previous: {},
      lastLog: [],
    },
    logIndex: false,
    summaryCharts: {},
    selectedNode: null,
    modalParams: null,
    currentTab: 'logStream',
  }
}

class Store extends EventEmitter {
  constructor() {
    super();
    Dispatcher.register(this.registerActions);
    this.init()
  }

  registerActions = ({ actionType, payload }) => {
    switch (actionType) {
      case Constants.TOGGLE_SIDEBAR:
        this.toggleSidebar();
        break;
      case Constants.SHOW_MODAL:
        this.showModal(payload);
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
      default:
    }
  }

  init = async () => {
    if (this.updateChartInterval)
      clearInterval(this.updateChartInterval)
    _store = getInitialStore();
    console.log('store settings: ',_store.settings);
    await this.initFlowChart();
    this.initLogStream();
    this.initCharts();
    _store.loading = false;
    this.emit('update-ui');
    this.emit('update-settings');
  }

  initFlowChart = async (yamlSTRING) => {
    let flow;
    if (yamlSTRING)
      flow = parseYAML(yamlSTRING);
    else {
      try{
        let str = await api.getYAML(_store.settings);
        flow = parseYAML(str);
      }
      catch(e){
        return;
      }
    }
    let canvas;
    try {
      canvas = flow.data.with.board.canvas;
    }
    catch (e) {
      console.log('could not find canvas');
      canvas = {};
    }
    console.log('pods: ', flow.data.pods)
    const parsed = formatForFlowchart(flow.data.pods, canvas);
    console.log('parsed: ', parsed);
    parsed.with = flow.data.with;
    _store.flowchart = parsed;
    this.emit('update-ui');
    this.emit('update-flowchart')
  }

  initLogStream = () => {
    api.connect(_store.settings, (message) => {
      const { type, data } = message;

      if (type === 'connect') {
        _store.connected = true;
        return this.showBanner(data, 'success')
      }

      if (type === 'error') {
        _store.connected = false;
        return this.showBanner(data, 'danger')
      }


      const log = data;
      // console.log('log: ', log)
      _store.logs.all.push(log);

      const source = log.name;

      if (_store.logs[source])
        _store.logs[source].push(log);
      else
        _store.logs[source] = [log];

      _store.logSources[source] = true;

      if (CHART_LEVELS.includes(log.levelname)) {
        _store.occurences.current[log.levelname]++;
      }
      // console.log('occurences: ',_store.occurences)
      this.emit('update-logs');
    })
  }

  initCharts = () => {
    CHART_LEVELS.map(level => {
      _store.occurences.current[level] = 0;
      _store.occurences.previous[level] = 0;
      _store.summaryCharts[level] = (new Array(NUM_CHART_ELEMENTS)).fill(0);
    });
    _store.occurences.lastLog = (new Array(NUM_CHART_ELEMENTS)).fill({});
    console.log('initial Occurences: ', _store.occurences);
    console.log('initial summary charts: ', _store.summaryCharts);
    this.updateChartInterval = setInterval(this.updateSummaryCharts, CHART_UPDATE_INTERVAL);
  }

  updateSummaryCharts = () => {
    const { current, previous, indeces } = _store.occurences;
    CHART_LEVELS.map(level => {
      const numLogs = current[level];
      const prevNum = previous[level];
      _store.summaryCharts[level].push(numLogs - prevNum);
      _store.summaryCharts[level].shift();
      _store.occurences.previous[level] = numLogs;
    });
    _store.occurences.lastLog.push(_store.logs.all.length - 1);
    _store.occurences.lastLog.shift();
    // console.log('summaryCharts:', _store.summaryCharts);
    this.emit('update-summary-chart');
  }

  toggleSidebar() {
    _store.menuVisible = !_store.menuVisible;
    this.emit('update-ui');
  }

  showLogAtIndex = (index) => {
    console.log('index: ', index);
    let logIndex = _store.occurences.lastLog[index];
    console.log('logIndex: ', logIndex);
    if (!logIndex)
      return;
    _store.logIndex = _store.occurences.lastLog[index];
    this.emit('show-log');
  }

  importCustomYAML = (customYAML) => {
    this.initFlowChart(customYAML);
    this.closeModal();
    this.emit('update-flowchart')
  }

  saveSettings = (settings) => {
    Object.keys(settings).map(key => {
      localStorage.setItem(`preferences-${key}`, settings[key]);
    });
    setTimeout(this.init,100);
  }

  showBanner = (message, theme) => {
    _store.banner = { message: String(message), theme };
    setTimeout(this.hideBanner, HIDE_BANNER_TIMEOUT);
    this.emit('update-ui');
  }

  hideBanner = () => {
    _store.banner = false;
    this.emit('update-ui');
  }

  showError = (error) => {
    alert(error);
  }

  showModal = (data) => {
    const { modal, params } = data;
    _store.modal = modal;
    _store.modalParams = params;
    this.emit('update-ui');
  }

  closeModal = () => {
    _store.modal = false;
    _store.modalParams = '';
    this.emit('update-ui');
  }

  getMenuState() {
    return _store.menuVisible;
  }

  getSidebarItems() {
    return _store.navItems;
  }

  getCurrentTab = () => {
    return _store.currentTab;
  }

  getSettings = () => {
    return _store.settings;
  }

  getBanner = () => {
    return _store.banner;
  }

  getModal = () => {
    return _store.modal;
  }

  getModalParams = () => {
    return _store.modalParams;
  }

  getLogs = () => {
    return _store.logs;
  }

  getLogSources = () => {
    return _store.logSources;
  }

  getSummaryCharts = () => {
    return _store.summaryCharts;
  }

  isConnected = () => {
    return _store.connected;
  }

  isLoading = () => {
    return _store.loading;
  }

  getFlowchart = () => {
    return _store.flowchart;
  }

  getAvailableProperties = () => {
    return propertyList;
  }

  getIndexedLog = () => {
    return _store.logIndex;
  }
}

export default new Store();