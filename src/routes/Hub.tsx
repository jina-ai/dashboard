import React from "react"
import { Redirect } from "react-router-dom"

// Layout Types
import { HubLayout } from "../layouts"

// Route Views
import PackageView from "../views/PackageView"
import LogIn from "../views/LogIn"
import NotFound from "../views/NotFound"
import NavigateButton from "../components/Common/NavigateButton"
import HubImagesList from "../components/Hub/HubImagesList"
import { HubLayoutProps } from "../layouts/HubLayout"

type Route<LayOutProps> = {
  path: string
  exact?: boolean
  layout: (props: LayOutProps) => JSX.Element
  component: () => JSX.Element
  props?: {
    usesConnection?: boolean
    usesAuth?: boolean
    navigateButton?: () => JSX.Element
  }
}
export type HubRoute = Route<HubLayoutProps>

export const hubRoutes: HubRoute[] = [
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
    component: HubImagesList,
    props: {
      usesConnection: false,
      usesAuth: true,
    },
  },
  {
    path: "/package/:packageId",
    layout: HubLayout,
    component: PackageView,
    props: {
      navigateButton: () => <NavigateButton label={"❮  Back"} path={"/home"} />,
    },
  },
  {
    path: "/login",
    layout: HubLayout,
    component: () => <LogIn />,
    props: {
      usesConnection: false,
      usesAuth: true,
    },
  },
]
