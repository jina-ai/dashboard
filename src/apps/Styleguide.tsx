import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import styled from "@emotion/styled"
import MainSidebar from "../components/Layout/MainSidebar/MainSidebar"
import { TNavItem } from "../redux/global/global.types"
import { styleGuideRoutes } from "../routes/Styleguide"
import { mediaQuery } from "../styles/mediaQuery"

import { Provider } from "react-redux"
import * as Sentry from "@sentry/react"
import { Integrations } from "@sentry/tracing"

import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/shards-dashboards.scss"
import "../App.css"
import store from "../redux"

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn:
      "https://085edd94ec3e479cb20f2c65f7b8cb82@o525420.ingest.sentry.io/5639443",
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  })
}

const Container = styled.div`
  display: flex;
`
const Aside = styled.aside`
  width: 25%;
  ${mediaQuery("lg")} {
    width: 16.67%;
  }
`
const Content = styled.article`
  flex-grow: 1;
`

const Styleguide = () => {
  return (
    <Provider store={store}>
      <Router>
        <Container>
          <Aside>
            <MainSidebar
              sidebarNavItems={styleGuideRoutes as TNavItem[]}
              menuVisible={true}
              toggleSidebar={() => undefined}
            />
          </Aside>

          <Content>
            <Switch>
              {styleGuideRoutes.map((route, index) => (
                <Route
                  key={index}
                  path={route.to}
                  exact={route.exact}
                  children={<route.component />}
                />
              ))}
            </Switch>
          </Content>
        </Container>
        <Redirect exact from="/" to={styleGuideRoutes[0].to} />
      </Router>
    </Provider>
  )
}

export default Styleguide
