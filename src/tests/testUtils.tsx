import { render } from "@testing-library/react"
import { ThemeProvider } from "@emotion/react"
import { theme } from "../theme"
import { Provider } from "react-redux"
import store from "../redux"
import React from "react"
import { Dashboard } from "../apps/Dashboard"
import { createHashHistory } from "history"

window.location.hash = "/"
const renderDashboardApp = (path: string) => {
  const history = createHashHistory()
  history.push(path)

  return {
    ...render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Dashboard />
        </Provider>
      </ThemeProvider>
    ),
    history,
  }
}

export default renderDashboardApp
