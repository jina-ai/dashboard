import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"

import { swaggerRoutes as routes } from "../routes"
import withTracker from "../withTracker"

import "bootstrap/dist/css/bootstrap.min.css"
import "../App.css"
import { ErrorBoundary } from "react-error-boundary"
import { FallbackPage } from "../views/FallbackPage"
import { SwaggerRoute } from "../routes/Swagger"

const Swagger = () => {
  document.title = "Jina Debug"
  return (
    <Router basename={"/"}>
      <div>
        {routes.map((route: SwaggerRoute, index: number) => {
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
  )
}

export { Swagger }
