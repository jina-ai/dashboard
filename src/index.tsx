import React from "react"
import ReactDOM from "react-dom"
import { ThemeProvider } from "@emotion/react"
import { Provider } from "react-redux"
import { theme } from "./theme"
import * as Sentry from "@sentry/react"
import { Integrations } from "@sentry/tracing"

import "bootstrap/dist/css/bootstrap.min.css"
import "./assets/main.scss"
import "./App.css"
import store from "./redux"

let App

if (process.env.REACT_APP_TARGET === "hub") {
  const { Hub } = require("./apps/Hub")
  App = Hub
} else {
  const { Dashboard } = require("./apps/Dashboard")
  App = Dashboard
}

Sentry.init({
  dsn:
    "https://085edd94ec3e479cb20f2c65f7b8cb82@o525420.ingest.sentry.io/5639443",
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
})

ReactDOM.render(
  // HOC to make theme available as a prop in all components
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
)
