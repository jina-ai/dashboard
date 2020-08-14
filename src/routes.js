import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DashboardLayout, IconSidebar } from "./layouts";

// Route Views
import FlowView from "./views/FlowView";
import LogsView from "./views/LogsView";
import TaskView from "./views/TaskView";
import Settings from "./views/Settings";
import HubView from "./views/HubView";
import PackageView from "./views/PackageView";
import LogIn from "./views/LogIn";

import NotFound from "./views/NotFound";

export default [
  {
    path: "/",
    exact: true,
    layout: DashboardLayout,
    component: () => <Redirect to="/logs" />,
  },
  {
    path: "/logs",
    layout: IconSidebar,
    component: LogsView,
  },
  {
    path: "/flow",
    layout: IconSidebar,
    component: FlowView,
  },
  {
    path: "/task",
    layout: IconSidebar,
    component: TaskView,
  },
  {
    path: "/settings",
    layout: IconSidebar,
    component: Settings,
  },
  {
    path: "/help",
    layout: IconSidebar,
    component: NotFound,
  },
  {
    path: "/home",
    layout: IconSidebar,
    component: NotFound,
  },
  {
    path: "/hub",
    layout: IconSidebar,
    component: HubView,
  },
  {
    path: "/package",
    layout: IconSidebar,
    component: PackageView,
  },
  {
    path: "/login",
    layout: IconSidebar,
    component: LogIn,
  },
];
