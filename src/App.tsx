import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";

import routes from "./routes";
import withTracker from "./withTracker";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/main.scss";
import "./App.css";
import { ErrorBoundary } from "react-error-boundary";
import { FallbackPage } from "./views/FallbackPage";
import { Store } from "./flux";

const App = () => {
  return (
    <Router basename={"/"}>
      <div>
        {routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={withTracker((props: any) => {
                return (
                  <route.layout {...props} {...route.props}>
                    <ErrorBoundary
                      FallbackComponent={FallbackPage}
                      onReset={() => Store.init()}
                    >
                      <route.component {...props} />
                    </ErrorBoundary>
                  </route.layout>
                );
              })}
            />
          );
        })}
      </div>
    </Router>
  );
};

export { App };
