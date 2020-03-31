import { EventEmitter } from "events";
import Dispatcher from "./dispatcher";
import Constants from "./constants";
import {parseYAML,formatForFlowchart} from "../helpers";
import api from "./api";
import flow1 from '../data/flow2.yml';


let _store = {
  loading: true,
  modal: false,
  flowchart: {},
  selectedNode: null,
  modalParams: null,
  flow:{},
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
      case Constants.UPDATE_YAML:
        this.updateYAML(payload);
        break;
      case Constants.SET_CURRENT_TAB:
        this.setCurrentTab(payload);
        break;
      default:
    }
  }

  init = () =>{
    const flow = parseYAML(flow1);
    const parsed = formatForFlowchart(flow.data.pods);
    console.log('parsed: ',parsed);
    _store.flowchart = parsed;
    _store.loading = false;
    this.emit('update-ui');
  }

  updateYAML = (data) => {

  }

  updateFlowchart = (chart) =>{
    _store.flowchart = chart;
    this.emit('update-flowchart');
  }

  setCurrentTab = (tab)=>{
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

  getFlowchart = () =>{
    return _store.flowchart;
  }
}

export default new Store();