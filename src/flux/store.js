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
const TASK_UPDATE_INTERVAL = 500;
const CHART_LEVELS = ['INFO', 'SUCCESS', 'WARNING', 'ERROR', 'CRITICAL', 'DEBUG']

function getInitialStore() {
  return {
    settings: {
      host: localStorage.getItem('preferences-host') || 'http://localhost',
      port: localStorage.getItem('preferences-port') || 5000,
      log: localStorage.getItem('preferences-log') || '/stream/log',
      profile: localStorage.getItem('preferences-profile') || '/stream/profile',
      yaml: localStorage.getItem('preferences-yaml') || '/data/yaml',
      shutdown: localStorage.getItem('preferences-shutdown') || '/action/shutdown',
      ready: localStorage.getItem('preferences-ready') || '/status/ready',
    },
    images: {},
    hub: [],
    banner: {
      flow: false,
      logs: false,
    },
    connected: {
      logs: false,
      flow: false
    },
    loading: true,
    modal: false,
    menuVisible: false,
    navItems: getSidebarNavItems(),
    flowchart: {
      selected: {},
      hovered: {},
      nodes: {},
      links: {},
      offset: { x: 0, y: 0 },
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
    taskData: {
      elapsed: {
        task_name: 'No Current Task',
        seconds: 0,
      },
      progress: {
        currentRequest: 0,
        bar_len: 0,
        num_bars: 0,
      },
      speed: {
        current: 0,
        unit: 'units',
        history: (new Array(30)).fill(0),
      },
      messages: [],
      bytes: [],
    },
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
      default:
    }
  }

  init = async () => {
    if (this.updateChartInterval)
      clearInterval(this.updateChartInterval)
    _store = getInitialStore();
    console.log('store settings: ', _store.settings);

    await this.initFlowChart();
    this.initLogStream();
    this.initCharts();
    this.initHub();
    this.initUser();

    _store.loading = false;
    this.emit('update-ui');
    this.emit('update-settings');
  }

  initFlowChart = async (yamlSTRING) => {
    let flow;
    const { settings } = _store;
    const connectionString = `${settings.host}:${settings.port}${settings.yaml.startsWith('/') ? settings.yaml : '/' + settings.yaml}`;

    if (yamlSTRING) {
      flow = parseYAML(yamlSTRING);
      _store.connected.flow = false;
    }
    else {
      try {
        let str = await api.getYAML(connectionString);
        flow = parseYAML(str);
        _store.connected.flow = true;
        this.showBanner('flow', `Getting YAML from ${connectionString}`, 'success')
      }
      catch (e) {
        _store.connected.flow = false;
        this.showBanner('flow', `Could not get YAML flow from ${connectionString}`, 'error')
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
    api.connect(_store.settings, this.handleNewLog, this.handleNewTaskEvent)
    this.updateTaskInterval = setInterval(()=>this.emit('update-task'),TASK_UPDATE_INTERVAL)
  }

  handleNewLog = (message) => {
    const { type, data } = message;

    if (type === 'connect') {
      _store.connected.logs = true;
      return this.showBanner('logs', data, 'success')
    }

    if (type === 'error') {
      _store.connected.logs = false;
      return this.showBanner('logs', data, 'error')
    }

    const log = data;

    log.formattedTimestamp = (new Date(log.created * 1000)).toLocaleString()
    log.idx = _store.logs.all.length;
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
  }

  handleNewTaskEvent = (message) => {
    const { type, data } = message;

    if (type === 'connect') {
      _store.connected.task = true;
      return this.showBanner('task', data, 'success')
    }

    if (type === 'error') {
      _store.connected.task = false;
      return this.showBanner('task', data, 'error')
    }

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
    } = event;


    if (bar_len && num_bars) {
      if (_store.taskData.progress.num_bars > num_bars)
        _store.taskData.progress.currentRequest++;
      _store.taskData.progress.bar_len = bar_len;
      _store.taskData.progress.num_bars = num_bars;
    }

    if (msg_recv && msg_sent) {
      console.log('process: ',process);
      let index = _store.taskData.messages.map((obj)=>obj.label).indexOf(process);
      let msgData = {
        label: process,
        sent: msg_sent,
        received: msg_recv
      }
      let bytesData = {
        label: process,
        sent: bytes_sent,
        received: bytes_recv
      }
      if (index < 0) {
        _store.taskData.messages.push(msgData);
        _store.taskData.bytes.push(bytesData);
      }
      else {
        _store.taskData.messages[index] = msgData;
        _store.taskData.bytes[index] = bytesData;
      }

      _store.taskData.messages = _store.taskData.messages.sort((a,b)=>(b.sent+b.received)-(a.sent+a.received))
      _store.taskData.bytes = _store.taskData.bytes.sort((a,b)=>(b.sent+b.received)-(a.sent+a.received))
    }

    if (speed && speed_unit) {
      _store.taskData.speed.unit = speed_unit;
      _store.taskData.speed.current = parseInt(speed);
      _store.taskData.speed.history.push(parseInt(speed));
      _store.taskData.speed.history.shift();
    }

    if (elapsed) {
      _store.taskData.elapsed.seconds = parseInt(elapsed);
      _store.taskData.elapsed.task_name = `Task: ${task_name}`;
    }
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

  initHub = async () => {
    try {
      const images = await api.getImages();
      _store.hub = images;
      _store.connected.hub = true;
    }
    catch (e) {
      _store.connected.hub = false
    }
    this.emit('update-hub');
  }

  initUser = async () => {
    const user = await api.getProfile();
    console.log('user', user);
    _store.user = user;
    this.emit('update-user');
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

  reconnect() {
    this.init();
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
    setTimeout(this.init, 100);
  }

  postRating = async ({ imageId, stars }) => {
    console.log('posting rating: ', imageId, stars);
    if (!_store.user)
      return window.location.hash = '#/login'
    let result;
    try {
      result = await api.postRating(imageId, stars);
    }
    catch (e) {
      if (String(e).includes('409'))
        e = 'Already Rated';
      return this.showError('hub', e);
    }
    if (result.error)
      this.showError('hub', result.error);
    else if (result.data) {
      const image = result.data;
      _store.images[image.id] = image;
      this.showBanner('hub', 'Rating successfully posted', 'success')
    }
    this.emit('update-hub');
  }

  postReview = async ({ imageId, content }) => {
    if (!_store.user) {
      this.closeModal()
      return window.location.hash = '#/login'
    }
    this.closeModal();
    let result;
    try {
      result = await api.postReview(imageId, content);
    }
    catch (e) {
      if (String(e).includes('409'))
        e = 'Already Reviewed';
      return this.showError('hub', e);
    }
    if (result.error)
      this.showError('hub', result.error);
    else if (result.data) {
      const image = result.data;
      _store.images[image.id] = image;
      this.showBanner('hub', 'Review successfully posted', 'success')
    }
    this.emit('update-hub');
  }

  logOut = async () => {
    await api.logOut();
    window.location.reload()
  }

  searchHub = async ({ category, q, sort }) => {
    const images = await api.searchHub(category, q, sort);
    console.log('found', images.length, 'images')
    _store.hub = images;
    this.emit('update-hub')
  }

  showBanner = (target, message, theme) => {
    _store.banner[target] = { message: String(message), theme };
    setTimeout(this.hideBanner, HIDE_BANNER_TIMEOUT);
    this.emit('update-ui');
  }

  hideBanner = () => {
    _store.banner = { logs: false, flow: false };
    this.emit('update-ui');
  }

  showError = (target, message) => {
    this.showBanner(target, message, 'error');
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

  getUser = () => {
    return _store.user;
  }

  getHubImages = () => {
    return _store.hub;
  }

  getHubImage = async imageId => {
    if (!_store.images[imageId]) {
      _store.images[imageId] = await api.getImage(imageId);
    }
    return _store.images[imageId];
  }

  getSettings = () => {
    return _store.settings;
  }

  getBanner = (panel = 'logs') => {
    return _store.banner[panel];
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

  getOccurencesByName = () => {
    let occurences = {};
    Object.keys(_store.logs).map(name => {
      if (name === 'all')
        return;
      else
        occurences[name] = _store.logs[name].length;
    })
    return occurences;
  }

  getTaskData = () => {
    return _store.taskData;
  }

  getActivePanel = () => {
    const path = window.location.hash.substring(2, window.location.hash.length);
    if (path.startsWith('flow'))
      return 'flow';
    if (path.startsWith('logs'))
      return 'logs';
    if (path.startsWith('hub') || path.startsWith('package'))
      return 'hub';
    if (path.startsWith('task'))
      return 'task';
    return 'neither'
  }

  getConnectionStatus = () => {
    const activePanel = this.getActivePanel();
    const status = _store.connected[activePanel];
    return status;
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