import React, { useState } from "react";
import { Container, Row, Col } from "shards-react";

import { MainNavbar, User } from "../components/Layout/MainNavbar/MainNavbar";
import MainFooter from "../components/Layout/MainFooter";
import { CookiesBanner } from "../components/Common/CookiesBanner";
import { InfoToast } from "../components/Common/InfoToast";

import WriteReview from "../modals/WriteReview";

import logger from "../logger";

import { useDispatch, useSelector } from "react-redux";
import store from "../redux";
import { showBanner } from "../redux/global/global.actions";
import { selectBanner, selectModal } from "../redux/global/global.selectors";

type HubLayoutProps = {
  children: React.ReactNode;
  usesAuth: boolean;
  usesConnection: boolean;
};

const HubLayout = (props: HubLayoutProps) => {
  const modal = useSelector(selectModal);
  const banner = useSelector(selectBanner);
  const loggerEnabled = logger.isEnabled();
  const user: User = {
    displayName: "dummyUser",
    emails: [{ value: "dummyUser@dummy.com" }],
    id: "idDummy",
    nodeId: "idDummy_node",
    photos: [{ value: "dummyPhoto" }],
    profileUrl: "dummyUrl",
    provider: "dummyProvider",
    username: "dummyUsername",
    _json: "dummyJSON",
    _raw: "dummyRaw",
  };
  const [acceptedCookies, setAcceptedCookies] = useState<boolean>(
    localStorage.getItem("accepted-cookies") === "true"
  );

  const dispatch = useDispatch();
  const acceptCookies = () => {
    localStorage.setItem("accepted-cookies", String(true));
    setAcceptedCookies(true);
  };

  const closeModal = () => {
    dispatch(closeModal());
  };

  const submitReview = (content: any) => {};

  const logOut = () => {};

  const enableLogger = () => {
    logger.enable();
    const storeCopy = store.getState();
    logger.log("Store Snapshot", storeCopy);
    dispatch(
      showBanner(
        'Debug Mode Enabled. Click "Export Debug Data" to download Debug JSON.',
        "warning"
      )
    );
  };

  const disableLogger = () => {
    logger.disable();
    dispatch(showBanner("Debug Mode Disabled.", "warning"));
  };

  const exportLogs = () => {};

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
