import React, { useEffect } from "react"
import { HashRouter as Router, Route } from "react-router-dom"
import { dashboardRoutes as routes } from "../routes"
import withTracker from "../withTracker"

import { ErrorBoundary } from "react-error-boundary"
import { FallbackPage } from "../views/FallbackPage"
import * as queryString from "querystring"
import { useDispatch } from "react-redux"
import { loginGithub } from "../redux/global/global.actions"
import { GithubCode } from "../redux/global/global.types"

const Dashboard = () => {
  document.title = "Jina Dashboard"
  const dispatch = useDispatch()
  useEffect(() => {
    const parsed = queryString.parse(window.location.search)
    const code = parsed["?code"] as GithubCode
    if (code) {
      dispatch(loginGithub(code))
    }
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
