import React from "react"
import { HashRouter as Router, Route } from "react-router-dom"
import { dashboardRoutes as routes } from "../routes"
import withTracker from "../withTracker"
import { Provider } from "react-redux"
import { ErrorBoundary } from "react-error-boundary"
import { FallbackPage } from "../views/FallbackPage"

import "../App.css"
import "swagger-ui-react/swagger-ui.css"
import store from "../redux"
import { initSentry } from "./utils"

initSentry()

if (window.Cypress) {
  window.store = store
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
