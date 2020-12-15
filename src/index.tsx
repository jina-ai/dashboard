import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "emotion-theming";
import { theme } from "./theme";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/main.scss";
import "./App.css";

let App;

if (process.env.REACT_APP_TARGET === "dashboard") {
  const { Dashboard } = require("./apps/Dashboard");
  App = Dashboard;
} else {
  const { Hub } = require("./apps/Hub");
  App = Hub;
}

ReactDOM.render(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>,
  document.getElementById("root")
);
