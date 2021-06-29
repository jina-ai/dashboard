import React from "react"
import { HashRouter as Router, Route } from "react-router-dom"

import { hubRoutes as routes } from "../routes"
import withTracker from "../withTracker"

import { Provider } from "react-redux"
import * as Sentry from "@sentry/react"
import { Integrations } from "@sentry/tracing"

import "bootstrap/dist/css/bootstrap.min.css"
// Todo: Remove shards and associated styles when we stop using it
import { ErrorBoundary } from "react-error-boundary"
import { FallbackPage } from "../views/FallbackPage"
import { HubRoute } from "../routes/Hub"
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

const Hub = () => {
  document.title = "Jina Hub"
  return (
    <Provider store={store}>
      <Router basename={"/"}>
        <div>
          {routes.map((route: HubRoute, index: number) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={withTracker((props) => {
                  return (
                    <route.layout {...props} {...route.props}>
                      <ErrorBoundary FallbackComponent={FallbackPage}>
                        <route.component {...props} />
                      </ErrorBoundary>
                    </route.layout>
                  )
                })}
              />
            )
          })}
        </div>
      </Router>
    </Provider>
  )
}

export default Hub
