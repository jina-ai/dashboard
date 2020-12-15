import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { HubLayout } from "../layouts";

// Route Views
import HubView from "../views/HubView";
import PackageView from "../views/PackageView";
import LogIn from "../views/LogIn";
import NotFound from "../views/NotFound";

export const hubRoutes = [
  {
    path: "/",
    exact: true,
    layout: HubLayout,
    component: () => <Redirect to="/home" />,
  },
  {
    path: "/help",
    layout: HubLayout,
    component: NotFound,
    props: {
      usesConnection: false,
      usesAuth: false,
    },
  },
  {
    path: "/home",
    layout: HubLayout,
    component: HubView,
    props: {
      usesConnection: false,
      usesAuth: true,
    },
  },
  {
    path: "/package",
    layout: HubLayout,
    component: PackageView,
    props: {
      usesConnection: false,
      usesAuth: true,
    },
  },
  {
    path: "/login",
    layout: HubLayout,
    component: LogIn,
    props: {
      usesConnection: false,
      usesAuth: true,
    },
  },
];
