import { EventEmitter } from "events";
import Dispatcher from "./dispatcher";
import Constants from "./constants";
import { parseYAML, formatForFlowchart } from "../helpers";
import api from "./api";
import propertyList from '../data/properties.json';
import { flow1 } from '../data/yaml';

let _store = {
  loading: true,
  modal: false,
  flowchart: {},
  logs: {},
  selectedNode: null,
  modalParams: null,
  currentTab: 'flowchart',
};

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
    _store.loading = false;
    this.emit('update-ui');
  }

  initFlowChart = (yamlSTRING = flow1) => {
    const flow = parseYAML(yamlSTRING);
    let canvas;
    try {
      canvas = flow.data.with.board.canvas;
    }
    catch (e) {
      console.log('could not find canvas');
      canvas = {};
    }
    const parsed = formatForFlowchart(flow.data.pods, canvas);
    console.log('parsed: ', parsed);
    _store.flowchart = parsed;
    this.emit('update-ui');
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