import React from "react"
import { HashRouter as Router, Route } from "react-router-dom"
import { dashboardRoutes as routes } from "../routes"
import withTracker from "../withTracker"
import { Provider } from "react-redux"
import * as Sentry from "@sentry/react"
import { Integrations } from "@sentry/tracing"

import { ErrorBoundary } from "react-error-boundary"
import { FallbackPage } from "../views/FallbackPage"

import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/shards-dashboards.scss"
import "../App.css"
import "swagger-ui-react/swagger-ui.css"
import store from "../redux"

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn:
      "https://085edd94ec3e479cb20f2c65f7b8cb82@o525420.ingest.sentry.io/5639443",
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  })
}

const Dashboard = () => {
  document.title = "Jina Dashboard"
  return (
    <Provider store={store}>
      <Router basename={"/"}>
        <div>
          {routes.map((route, idx: number) => {
            return (
              <Route
                key={`${route.path}-${idx}`}
                path={route.path}
                exact={route.exact}
                component={withTracker((props: any) => {
                  return (
                    <route.layout {...props} {...route.props}>
                      <ErrorBoundary FallbackComponent={FallbackPage}>
                        <route.component {...props} />
                      </ErrorBoundary>
                    </route.layout>
                  )
                }, {})}
              />
            )
          })}
        </div>
      </Router>
    </Provider>
  )
}

export default Dashboard
