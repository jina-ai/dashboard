import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@emotion/react";
import { Provider } from "react-redux";
import { theme } from "./theme";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/main.scss";
import "./App.css";
import store from "./redux";

let App;

if (process.env.REACT_APP_TARGET === "dashboard") {
  const { Dashboard } = require("./apps/Dashboard");
  App = Dashboard;
} else {
  const { Hub } = require("./apps/Hub");
  App = Hub;
}

ReactDOM.render(
  // HOC to make theme available as a prop in all components
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);
