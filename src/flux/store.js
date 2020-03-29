import { EventEmitter } from "events";
import Dispatcher from "./dispatcher";
import Constants from "./constants";
import api from "./api";


let _store = {
  loading: false,
  modal: false,
  modalParams: null,
  currentTab: 'flowChart',
};

class Store extends EventEmitter {
  constructor() {
    super();
    Dispatcher.register(this.registerActions);
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

  updateYAML = (data) => {

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
}

export default new Store();