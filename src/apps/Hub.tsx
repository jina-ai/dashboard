import React from "react"
import { HashRouter as Router, Route } from "react-router-dom"

import { hubRoutes as routes } from "../routes"
import withTracker from "../withTracker"
import { Provider } from "react-redux"
import { ErrorBoundary } from "react-error-boundary"
import { FallbackPage } from "../views/FallbackPage"
import { HubRoute } from "../routes/Hub"

// Todo: Remove shards and associated styles when we stop using it
import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/shards-dashboards.scss"
import "../App.css"
import store from "../redux"
import { initSentry } from "./utils"

initSentry()

if (window.Cypress) {
  window.store = store
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
