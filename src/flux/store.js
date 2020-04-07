import { EventEmitter } from "events";
import Dispatcher from "./dispatcher";
import Constants from "./constants";
import { parseYAML, formatForFlowchart } from "../helpers";
import api from "./api";
import propertyList from '../data/properties.json';

let _store = {
  loading: true,
  modal: false,
  flowchart: {},
  logs: [],
  occurences: {
    current: {},
    previous: {}
  },
  summaryCharts: {},
  selectedNode: null,
  modalParams: null,
  currentTab: 'logStream',
};

const NUM_CHART_ELEMENTS = 60;
const CHART_UPDATE_INTERVAL = 1000;
const CHART_LEVELS = ['INFO', 'SUCCESS', 'CRITICAL']

class Store extends EventEmitter {
  constructor() {
    super();
    Dispatcher.register(this.registerActions);
    this.init()
  }

  registerActions = ({ actionType, payload }) => {
    switch (actionType) {
      case Constants.SET_CURRENT_TAB:
        this.setCurrentTab(payload);
        break;
      case Constants.SHOW_MODAL:
        this.showModal(payload);
        break;
      case Constants.IMPORT_CUSTOM_YAML:
        this.importCustomYAML(payload);
        break;
      default:
    }
  }

  init = async () => {
    await this.initFlowChart();
    this.initLogStream();
    this.initCharts();
    _store.loading = false;
    this.emit('update-ui');
  }

  initFlowChart = async (yamlSTRING) => {
    let flow;
    if (yamlSTRING)
      flow = parseYAML(yamlSTRING);
    else {
      let str = await api.getYAML();
      flow = parseYAML(str);
    }
    let canvas;
    try {
      canvas = flow.data.with.board.canvas;
    }
    catch (e) {
      console.log('could not find canvas');
      canvas = {};
    }
    console.log('pods: ',flow.data.pods)
    const parsed = formatForFlowchart(flow.data.pods, canvas);
    console.log('parsed: ', parsed);
    parsed.with = flow.data.with;
    _store.flowchart = parsed;
    this.emit('update-ui');
  }

  initLogStream = () => {
    api.onNewLog((log) => {
      if (log.error)
        return console.error('Log Stream Error: ' + log.error);
      // console.log('log: ', log)
      _store.logs.push(log.data);
      if (CHART_LEVELS.includes(log.data.levelname)) {
        _store.occurences.current[log.data.levelname]++;
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
    console.log('initial Occurences: ', _store.occurences);
    console.log('initial summary charts: ', _store.summaryCharts);
    this.updateChartInterval = setInterval(this.updateSummaryCharts, CHART_UPDATE_INTERVAL);
  }

  updateSummaryCharts = () => {
    const { current, previous } = _store.occurences;
    CHART_LEVELS.map(level => {
      const numLogs = current[level];
      const prevNum = previous[level];
      _store.summaryCharts[level].push(numLogs - prevNum);
      _store.summaryCharts[level].shift();
      _store.occurences.previous[level] = numLogs;
    });
    // console.log('summaryCharts:', _store.summaryCharts);
    this.emit('update-summary-chart');
  }

  importCustomYAML = (customYAML) => {
    this.initFlowChart(customYAML);
    this.closeModal();
    this.emit('update-flowchart')
  }

  setCurrentTab = (tab) => {
    _store.currentTab = tab;
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

  getCurrentTab = () => {
    return _store.currentTab;
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

  getSummaryCharts = () => {
    return _store.summaryCharts;
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
}

export default new Store();