import React from "react"
import ReactDOM from "react-dom"
import { ThemeProvider } from "@emotion/react"
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles"
import { theme } from "./theme"
import { newVersionLocalStorageReset } from "./helpers/utils"

const DEFAULT_TARGET = "Dashboard"

const version = require("../package.json").version
const localVersion = localStorage.getItem("version")

newVersionLocalStorageReset(version, localVersion)

const { REACT_APP_TARGET } = process.env

function renderApp(imported: any) {
  const App = imported.default
  ReactDOM.render(
    // HOC to make theme available as a prop in all components
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </MuiThemeProvider>,
    document.getElementById("root")
  )
}

import(`./apps/${REACT_APP_TARGET || DEFAULT_TARGET}`).then(renderApp)
