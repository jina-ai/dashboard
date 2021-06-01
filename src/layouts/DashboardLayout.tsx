import React, { useState } from "react"
import Grid from "@material-ui/core/Grid"

import TopNavBar from "../components/Layout/TopNavBar/TopNavBar"
import SideNavBar from "../components/Layout/SideNavBar/SideNavBar"
import MainFooter from "../components/Layout/MainFooter"
import { CookiesBanner } from "../components/Common/CookiesBanner"
import { InfoToast } from "../components/Common/InfoToast"
import { ConnectionToast } from "../components/Common/ConnectionToast"

import PasteYAML from "../modals/PasteYAML"
import WriteReview from "../modals/WriteReview"
import LogDetails from "../modals/LogDetails"

import logger from "../logger"

import { useDispatch, useSelector } from "react-redux"
import {
  selectBanners,
  selectConnectionStatus,
  selectLoading,
  selectModal,
  selectModalParams,
  selectSidebarItems,
  selectUser,
} from "../redux/global/global.selectors"
import store from "../redux"
import NewFlow from "../modals/NewFlow"
import PodEdit from "../modals/PodEdit"
import {
  showBanner,
  toggleSidebar,
  closeModal,
  connectJinaD,
} from "../redux/global/global.actions"
import { importFlow } from "../redux/flows/flows.actions"
import FlowSettings from "../modals/FlowSettings"
import QuerySearchModal from "../modals/QuerySearchModal"

type IconSideBarLayoutProps = {
  children: React.ReactNode
  usesAuth: boolean
  usesConnection: boolean
  navigateButton?: () => React.ReactNode
}

const DashboardLayout = (props: IconSideBarLayoutProps) => {
  const modal = useSelector(selectModal)
  const modalParams = useSelector(selectModalParams)
  const loading = useSelector(selectLoading)
  const banners = useSelector(selectBanners)
  const connected = useSelector(selectConnectionStatus)
  const loggerEnabled = logger.isEnabled()
  const sidebarNavItems = useSelector(selectSidebarItems)
  const user = useSelector(selectUser)
  const [acceptedCookies, setAcceptedCookies] = useState<boolean>(
    localStorage.getItem("accepted-cookies") === "true"
  )

  const dispatch = useDispatch()
  const acceptCookies = () => {
    localStorage.setItem("accepted-cookies", String(true))
    setAcceptedCookies(true)
  }

  const _closeModal = () => {
    dispatch(closeModal())
  }

  const importYAML = (yamlString: string) => {
    dispatch(importFlow(yamlString))
    _closeModal()
  }

  const submitReview = () => {
    if (modalParams) {
    }
  }

  const reconnect = () => {
    dispatch(connectJinaD())
  }

  const logOut = () => {}

  const _toggleSidebar = () => {
    dispatch(toggleSidebar())
  }

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

  const exportLogs = () => {
    const storeCopy = store.getState()
    logger.log("Store Snapshot", storeCopy)
    logger.exportLogs()
  }

  const { children, usesAuth, usesConnection, navigateButton } = props
  return (
    <>
      <TopNavBar
        user={user}
        usesAuth={usesAuth}
        usesConnection={usesConnection}
        logOut={logOut}
        toggleSidebar={_toggleSidebar}
        reconnect={reconnect}
        connected={connected}
        navigateButton={navigateButton}
      />
      <Grid container>
        <Grid item xs={2}>
          <SideNavBar
            sidebarNavItems={sidebarNavItems}
            toggleSidebar={_toggleSidebar}
          />
        </Grid>
        <Grid item xs={10}>
          {banners.map((banner, index) => (
            <InfoToast data={banner} index={index} key={index} />
          ))}
          {usesConnection && !loading && !connected && (
            <ConnectionToast reconnect={reconnect} />
          )}
          {children}
          {!acceptedCookies && <CookiesBanner acceptCookies={acceptCookies} />}
        </Grid>
      </Grid>
      <MainFooter
        loggerEnabled={loggerEnabled}
        enableLogger={enableLogger}
        disableLogger={disableLogger}
        exportLogs={exportLogs}
      />
      <LogDetails
        open={modal === "logDetails"}
        closeModal={_closeModal}
        modalParams={modalParams}
      />
      <PasteYAML
        open={modal === "import"}
        closeModal={_closeModal}
        importYAML={importYAML}
      />
      <NewFlow open={modal === "newFlow"} />
      <WriteReview
        open={modal === "review"}
        closeModal={_closeModal}
        submitReview={submitReview}
      />
      {modal === "podEdit" && (
        <PodEdit
          open={modal === "podEdit"}
          closeModal={_closeModal}
          modalParams={modalParams}
        />
      )}
      {modal === "flowSettings" && (
        <FlowSettings
          open={modal === "flowSettings"}
          closeModal={_closeModal}
          modalParams={modalParams}
        />
      )}
      {modal === "QuerySearch" && (
        <QuerySearchModal
          open={modal === "QuerySearch"}
          closeModal={_closeModal}
          modalParams={modalParams}
        />
      )}
    </>
  )
}

export default DashboardLayout
