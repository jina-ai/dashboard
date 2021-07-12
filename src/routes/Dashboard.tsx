import React from "react"
import { Redirect } from "react-router-dom"

// Layout Types
import { IconSidebarLayout } from "../layouts/IconSidebar"

// Route Views
import { LogsView } from "../views/LogsView"
import TaskView from "../views/TaskView"
import Settings from "../views/Settings"
import HubView from "../views/HubView"
import PackageView from "../views/PackageView"
import LogIn from "../views/LogIn"

import NotFound from "../views/NotFound"
import HomeView from "../views/HomeView"
import NavigateButton from "../components/Common/NavigateButton"
import FlowView from "../views/FlowView"
import { isFeatureEnabled } from "../helpers/featureSwitch"
import SwaggerView from "../views/SwaggerView"

export const dashboardRoutes = [
  {
    path: "/",
    exact: true,
    layout: IconSidebarLayout,
    component: () => <Redirect to="/logs" />,
  },

  {
    path: "/logs",
    layout: IconSidebarLayout,
    component: LogsView,
    props: {
      usesConnection: true,
      usesAuth: false,
    },
  },
  {
    path: "/flow",
    layout: IconSidebarLayout,
    component: FlowView,
    props: {
      usesConnection: true,
      usesAuth: false,
    },
  },
  {
    path: "/task",
    layout: IconSidebarLayout,
    component: TaskView,
    props: {
      usesConnection: true,
      usesAuth: false,
    },
  },
  {
    path: "/settings",
    layout: IconSidebarLayout,
    component: Settings,
    props: {
      usesConnection: true,
      usesAuth: false,
    },
  },
  {
    path: "/help",
    layout: IconSidebarLayout,
    component: NotFound,
    props: {
      usesConnection: false,
      usesAuth: false,
    },
  },
  {
    path: "/home",
    layout: IconSidebarLayout,
    // Todo: remove feature flag and corresponding conditions after releasing HomeView in all instances
    component: isFeatureEnabled("HOMEPAGE") ? HomeView : NotFound,
    props: {
      usesConnection: false,
      usesAuth: false,
    },
  },
  {
    path: "/hub",
    layout: IconSidebarLayout,
    component: HubView,
    props: {
      usesConnection: false,
      usesAuth: true,
    },
  },
  {
    path: "/package/:kind/:packageId",
    layout: IconSidebarLayout,
    component: PackageView,
    props: {
      navigateButton: () => (
        <NavigateButton label={"❮  Back"} path={"/hub/explore"} />
      ),
    },
  },
  {
    path: "/login",
    layout: IconSidebarLayout,
    component: LogIn,
    props: {
      usesConnection: false,
      usesAuth: true,
    },
  },
  {
    path: "/debug",
    layout: IconSidebarLayout,
    component: SwaggerView,
    props: {
      usesConnection: true,
      usesAuth: true,
    },
  },
]
