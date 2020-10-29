import React from "react";
import { Container, Row, Col } from "shards-react";

import { MainNavbar } from "../components/Layout/MainNavbar/MainNavbar";
import MainSidebar from "../components/Layout/MainSidebar/MainSidebar";
import MainFooter from "../components/Layout/MainFooter";
import { CookiesBanner } from "../components/Common/CookiesBanner";
import { InfoBanner } from "../components/Common/InfoBanner";
import { ConnectionBanner } from "../components/Common/ConnectionBanner";

import PasteYAML from "../modals/PasteYAML";
import WriteReview from "../modals/WriteReview";
import LogDetails from "../modals/LogDetails";

import logger from "../logger";

import { Store, Dispatcher, Constants } from "../flux";

class IconSidebarLayout extends React.Component {
  constructor() {
    super();
    this.state = {
      loggerEnabled: logger.isEnabled(),
      modal: Store.getModal(),
      modalParams: Store.getModalParams(),
      loading: Store.isLoading(),
      user: Store.getUser(),
      banner: Store.getBanner(),
      connected: Store.getConnectionStatus(),
      menuVisible: Store.getMenuState(),
      sidebarNavItems: Store.getSidebarItems(),
      acceptedCookies: localStorage.getItem("accepted-cookies"),
    };
    Store.on("update-ui", this.getData);
    Store.on("update-user", this.getUser);
  }

  componentWillUnmount = () => {
    Store.removeListener("update-ui", this.getData);
    Store.removeListener("update-user", this.getUser);
  };

  getData = () => {
    const modal = Store.getModal();
    const modalParams = Store.getModalParams();
    const loading = Store.isLoading();
    const banner = Store.getBanner();
    const connected = Store.getConnectionStatus();
    const loggerEnabled = logger.isEnabled();
    const menuVisible = Store.getMenuState();
    const sidebarNavItems = Store.getSidebarItems();
    this.setState({
      modal,
      loading,
      banner,
      connected,
      modalParams,
      loggerEnabled,
      menuVisible,
      sidebarNavItems,
    });
  };

  getUser = () => {
    const user = Store.getUser();
    this.setState({ user });
  };

  acceptCookies = () => {
    localStorage.setItem("accepted-cookies", true);
    this.setState({ acceptedCookies: true });
  };

  closeModal = () => {
    Dispatcher.dispatch({
      actionType: Constants.CLOSE_MODAL,
    });
  };

  importYAML = (yamlString) => {
    Dispatcher.dispatch({
      actionType: Constants.IMPORT_CUSTOM_YAML,
      payload: yamlString,
    });
  };

  submitReview = (content) => {
    const { imageId } = this.state.modalParams;
    Dispatcher.dispatch({
      actionType: Constants.POST_REVIEW,
      payload: { content, imageId },
    });
  };

  reconnect = () => {
    Dispatcher.dispatch({
      actionType: Constants.RECONNECT,
    });
  };

  logOut = () => {
    Dispatcher.dispatch({
      actionType: Constants.LOG_OUT,
    });
  };

  toggleSidebar = () => {
    Dispatcher.dispatch({
      actionType: Constants.TOGGLE_SIDEBAR,
    });
  };

  enableLogger = () => {
    logger.enable();
    const storeCopy = Store.getStoreCopy();
    logger.log("Store Snapshot", storeCopy);
    Dispatcher.dispatch({
      actionType: Constants.SHOW_BANNER,
      payload: [
        'Debug Mode Enabled. Click "Export Debug Data" to download Debug JSON.',
        "warning",
      ],
    });
  };

  disableLogger = () => {
    logger.disable();
    Dispatcher.dispatch({
      actionType: Constants.SHOW_BANNER,
      payload: ["Debug Mode Disabled.", "warning"],
    });
  };

  exportLogs = () => {
    const storeCopy = Store.getStoreCopy();
    logger.log("Store Snapshot", storeCopy);
    logger.exportLogs();
  };

  toggleSidebar = () => {
    Dispatcher.dispatch({
      actionType: Constants.TOGGLE_SIDEBAR,
    });
  };

  render = () => {
    const {
      modal,
      acceptedCookies,
      banner,
      connected,
      user,
      loading,
      modalParams,
      loggerEnabled,
      menuVisible,
      sidebarNavItems,
    } = this.state;
    const { children, usesAuth, usesConnection } = this.props;
    return (
      <Container fluid className="icon-sidebar-nav">
        <Row>
          <MainSidebar
            hideLogoText
            sidebarNavItems={sidebarNavItems}
            menuVisible={menuVisible}
            toggleSidebar={this.toggleSidebar}
          />
          <Col className="main-content col" tag="main">
            <MainNavbar
              usesAuth={usesAuth}
              usesConnection={usesConnection}
              logOut={this.logOut}
              toggleSidebar={this.toggleSidebar}
              reconnect={this.reconnect}
              connected={connected}
              user={user}
            />
            <InfoBanner data={banner} />
            {usesConnection && !loading && !connected && (
              <ConnectionBanner reconnect={this.reconnect} />
            )}
            {children}
            {!acceptedCookies && (
              <CookiesBanner acceptCookies={this.acceptCookies} />
            )}
            <MainFooter
              loggerEnabled={loggerEnabled}
              enableLogger={this.enableLogger}
              disableLogger={this.disableLogger}
              exportLogs={this.exportLogs}
            />
          </Col>
        </Row>
        <LogDetails
          open={modal === "logDetails"}
          closeModal={this.closeModal}
          submitReview={this.submitReview}
          modalParams={modalParams}
        />
        <PasteYAML
          open={modal === "import"}
          closeModal={this.closeModal}
          importYAML={this.importYAML}
        />
        <WriteReview
          open={modal === "review"}
          closeModal={this.closeModal}
          submitReview={this.submitReview}
        />
      </Container>
    );
  };
}

export default IconSidebarLayout;
