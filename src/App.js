import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";

import routes from "./routes";
import withTracker from "./withTracker";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/main.scss";
import "./App.css";
import { ErrorBoundary } from "react-error-boundary";
import { FallbackPage } from "./FallbackPage";

const App = () => (
  <Router basename={"/"}>
    <div>
      {routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={withTracker((props) => {
              return (
                <ErrorBoundary FallbackComponent={FallbackPage}>
                  <route.layout {...props}>
                    <route.component {...props} />
                  </route.layout>
                </ErrorBoundary>
              );
            })}
          />
        );
      })}
    </div>
  </Router>
);

export { App };
