import React, { useEffect } from "react"
import { HashRouter as Router, Route } from "react-router-dom"
import { dashboardRoutes as routes } from "../routes"
import withTracker from "../withTracker"

import { ErrorBoundary } from "react-error-boundary"
import { FallbackPage } from "../views/FallbackPage"
import * as queryString from "querystring"

const Dashboard = () => {
  document.title = "Jina Dashboard"

  useEffect(() => {
    const parsed = queryString.parse(window.location.search)
    console.log(parsed["?code"])
  })

  return (
    <Router basename={"/"}>
      <div>
        {routes.map((route: any, index: number) => {
          return (
            <Route
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
  )
}

export { Dashboard }
