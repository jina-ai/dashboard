import React from "react";
import { Container, Row, Col } from "shards-react";

import MainNavbar from "../components/Layout/MainNavbar/MainNavbar";
import MainSidebar from "../components/Layout/MainSidebar/MainSidebar";
import MainFooter from "../components/Layout/MainFooter";
import CookiesBanner from "../components/Common/CookiesBanner";
import InfoBanner from "../components/Common/InfoBanner";
import ConnectionBanner from "../components/Common/ConnectionBanner";

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
      banner: Store.getBanner(),
      connected: Store.getConnectionStatus(),
      acceptedCookies: localStorage.getItem("accepted-cookies"),
    };
    Store.on("update-ui", this.getData);
  }

  componentWillUnmount = () => {
    Store.removeListener("update-ui", this.getData);
  };

  getData = () => {
    const modal = Store.getModal();
    const modalParams = Store.getModalParams();
    const loading = Store.isLoading();
    const banner = Store.getBanner();
    const connected = Store.getConnectionStatus();
    const loggerEnabled = logger.isEnabled();
    this.setState({
      modal,
      loading,
      banner,
      connected,
      modalParams,
      loggerEnabled,
    });
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

  render = () => {
    const {
      modal,
      acceptedCookies,
      banner,
      connected,
      loading,
      modalParams,
      loggerEnabled,
    } = this.state;
    const { children } = this.props;
    return (
      <Container fluid className="icon-sidebar-nav">
        <Row>
          <MainSidebar hideLogoText />
          <Col className="main-content col" tag="main">
            <MainNavbar />
            <InfoBanner data={banner} />
            <ConnectionBanner
              loading={loading}
              connected={connected}
              reconnect={this.reconnect}
            />
            {children}
            <CookiesBanner
              show={!acceptedCookies}
              acceptCookies={this.acceptCookies}
            />
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
