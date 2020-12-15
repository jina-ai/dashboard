import React from "react";
import { Container, Row, Col } from "shards-react";

import { MainNavbar } from "../components/Layout/MainNavbar/MainNavbar";
import MainFooter from "../components/Layout/MainFooter";
import { CookiesBanner } from "../components/Common/CookiesBanner";
import { InfoToast } from "../components/Common/InfoToast";

import WriteReview from "../modals/WriteReview";

import logger from "../logger";

import { Store, Dispatcher, Constants } from "../flux";

class HubLayout extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      loggerEnabled: logger.isEnabled(),
      modal: Store.getModal(),
      modalParams: Store.getModalParams(),
      loading: Store.isLoading(),
      user: Store.getUser(),
      banner: Store.getBanner(),
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
    const loggerEnabled = logger.isEnabled();
    this.setState({
      modal,
      loading,
      banner,
      modalParams,
      loggerEnabled,
    });
  };

  getUser = () => {
    const user = Store.getUser();
    this.setState({ user });
  };

  acceptCookies = () => {
    localStorage.setItem("accepted-cookies", String(true));
    this.setState({ acceptedCookies: true });
  };

  closeModal = () => {
    Dispatcher.dispatch({
      actionType: Constants.CLOSE_MODAL,
    });
  };

  submitReview = (content: any) => {
    const { imageId } = this.state.modalParams;
    Dispatcher.dispatch({
      actionType: Constants.POST_REVIEW,
      payload: { content, imageId },
    });
	};
	
  logOut = () => {
    Dispatcher.dispatch({
      actionType: Constants.LOG_OUT,
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
      user,
      loggerEnabled,
    } = this.state;
    const { children, usesAuth, usesConnection } = this.props;
    return (
      <Container>
        <Row>
          <Col className="main-content col" tag="main">
            <MainNavbar
              usesAuth={usesAuth}
              usesConnection={usesConnection}
							logOut={this.logOut}
              hideSidebarToggle={true}
              showLogo
              user={user}
            />
            <InfoToast data={banner} />
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
        <WriteReview
          open={modal === "review"}
          closeModal={this.closeModal}
          submitReview={this.submitReview}
        />
      </Container>
    );
  };
}

export default HubLayout;
