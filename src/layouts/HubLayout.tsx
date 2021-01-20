import React, { useState } from "react";
import { Container, Row, Col } from "shards-react";

import { MainNavbar } from "../components/Layout/MainNavbar/MainNavbar";
import MainFooter from "../components/Layout/MainFooter";
import { CookiesBanner } from "../components/Common/CookiesBanner";
import { InfoToast } from "../components/Common/InfoToast";

import WriteReview from "../modals/WriteReview";

import logger from "../logger";

import { Store, Dispatcher, Constants } from "../flux";

type HubLayoutProps = {
  children: React.ReactNode;
  usesAuth: boolean;
  usesConnection: boolean;
};

const HubLayout = (props: HubLayoutProps) => {
  const modal = Store.getModal();
  const modalParams = Store.getModalParams();
  const banner = Store.getBanner();
  const loggerEnabled = logger.isEnabled();
  const user = Store.getUser();
  const [acceptedCookies, setAcceptedCookies] = useState<boolean>(
    localStorage.getItem("accepted-cookies") === "true"
  );

  const acceptCookies = () => {
    localStorage.setItem("accepted-cookies", String(true));
    setAcceptedCookies(true);
  };

  const closeModal = () => {
    Dispatcher.dispatch({
      actionType: Constants.CLOSE_MODAL,
    });
  };

  const submitReview = (content: any) => {
    const { imageId } = modalParams;
    Dispatcher.dispatch({
      actionType: Constants.POST_REVIEW,
      payload: { content, imageId },
    });
  };

  const logOut = () => {
    Dispatcher.dispatch({
      actionType: Constants.LOG_OUT,
    });
  };

  const enableLogger = () => {
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

  const disableLogger = () => {
    logger.disable();
    Dispatcher.dispatch({
      actionType: Constants.SHOW_BANNER,
      payload: ["Debug Mode Disabled.", "warning"],
    });
  };

  const exportLogs = () => {
    const storeCopy = Store.getStoreCopy();
    logger.log("Store Snapshot", storeCopy);
    logger.exportLogs();
  };

  const { children, usesAuth, usesConnection } = props;
  return (
    <Container>
      <Row>
        <Col className="main-content col" tag="main">
          <MainNavbar
            usesAuth={usesAuth}
            usesConnection={usesConnection}
            logOut={logOut}
            hideSidebarToggle={true}
            showLogo
            user={user}
          />
          <InfoToast data={banner} />
          {children}
          {!acceptedCookies && <CookiesBanner acceptCookies={acceptCookies} />}
          <MainFooter
            loggerEnabled={loggerEnabled}
            enableLogger={enableLogger}
            disableLogger={disableLogger}
            exportLogs={exportLogs}
          />
        </Col>
      </Row>
      <WriteReview
        open={modal === "review"}
        closeModal={closeModal}
        submitReview={submitReview}
      />
    </Container>
  );
};

export default HubLayout;
