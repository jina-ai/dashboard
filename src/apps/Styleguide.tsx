import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import styled from "@emotion/styled"
import SideNavBar from "../components/Layout/SideNavBar/SideNavBar"
import { TNavItem } from "../redux/global/global.types"
import { styleGuideRoutes } from "../routes/Styleguide"
import { mediaQuery } from "../styles/mediaQuery"
import { Provider } from "react-redux"
import "../App.css"
import store from "../redux"
import { initSentry } from "./utils"

initSentry()

if (window.Cypress) {
  window.store = store
}

const Container = styled.div`
  display: flex;
`
const Aside = styled.aside`
  width: 25%;
  ${mediaQuery("lg")} {
    width: 16.67%;
  }
`
const Content = styled.article`
  flex-grow: 1;
`

const Styleguide = () => {
  return (
    <Provider store={store}>
      <Router>
        <Container>
          <Aside>
            <SideNavBar
              sidebarNavItems={styleGuideRoutes as TNavItem[]}
              menuVisible={true}
              toggleSidebar={() => undefined}
            />
          </Aside>

          <Content>
            <Switch>
              {styleGuideRoutes.map((route, index) => (
                <Route
                  key={index}
                  path={route.to}
                  exact={route.exact}
                  children={<route.component />}
                />
              ))}
            </Switch>
          </Content>
        </Container>
        <Redirect exact from="/" to={styleGuideRoutes[0].to} />
      </Router>
    </Provider>
  )
}

export default Styleguide
