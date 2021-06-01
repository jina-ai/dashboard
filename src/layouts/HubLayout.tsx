import React, { useState } from "react"
import   Container  from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid"

import TopNavBar from "../components/Layout/TopNavBar/TopNavBar"
import MainFooter from "../components/Layout/MainFooter"
import { CookiesBanner } from "../components/Common/CookiesBanner"
import { InfoToast } from "../components/Common/InfoToast"

import WriteReview from "../modals/WriteReview"

import logger from "../logger"

import { useDispatch, useSelector } from "react-redux"
import store from "../redux"
import { showBanner } from "../redux/global/global.actions"
import { selectBanners, selectModal } from "../redux/global/global.selectors"
import { User } from "../redux/global/global.types";

export type HubLayoutProps = {
  children: React.ReactNode
  usesAuth: boolean
  usesConnection: boolean
  navigateButton?: () => React.ReactNode
}

const HubLayout = (props: HubLayoutProps) => {
  const modal = useSelector(selectModal)
  const banners = useSelector(selectBanners)
  const loggerEnabled = logger.isEnabled()
  const user: User = {
    displayName: "dummyUser",
    emails: ["dummyUser@dummy.com"],
    id: "idDummy",
    nodeId: "idDummy_node",
    profileUrl: "dummyUrl",
    provider: "dummyProvider",
    username: "dummyUsername",
    _raw: "dummyRaw",
  }
  const [acceptedCookies, setAcceptedCookies] = useState<boolean>(
    localStorage.getItem("accepted-cookies") === "true"
  )

  const dispatch = useDispatch()
  const acceptCookies = () => {
    localStorage.setItem("accepted-cookies", String(true))
    setAcceptedCookies(true)
  }

  const closeModal = () => {
    dispatch(closeModal())
  }

  const submitReview = (content: any) => {}

  const logOut = () => {}

  const enableLogger = () => {
    logger.enable()
    const storeCopy = store.getState()
    logger.log("Store Snapshot", storeCopy)
    dispatch(
      showBanner(
        'Debug Mode Enabled. Click "Export Debug Data" to download Debug JSON.',
        "warning"
      )
    )
  }

  const disableLogger = () => {
    logger.disable()
    dispatch(showBanner("Debug Mode Disabled.", "warning"))
  }

  const exportLogs = () => {}

  const { children, usesAuth, usesConnection, navigateButton } = props
  return (
    <Container>
      <Grid container>
        <Grid item className="main-content col">
          <TopNavBar
            usesAuth={usesAuth}
            usesConnection={usesConnection}
            logOut={logOut}
            hideSidebarToggle={true}
            showLogo
            user={user}
            navigateButton={navigateButton}
          />
          {banners.map((banner, index) => (
            <InfoToast data={banner} index={index} />
          ))}
          {children}
          {!acceptedCookies && <CookiesBanner acceptCookies={acceptCookies} />}
          <MainFooter
            loggerEnabled={loggerEnabled}
            enableLogger={enableLogger}
            disableLogger={disableLogger}
            exportLogs={exportLogs}
          />
        </Grid>
      </Grid>
      <WriteReview
        open={modal === "review"}
        closeModal={closeModal}
        submitReview={submitReview}
      />
    </Container>
  )
}

export default HubLayout
