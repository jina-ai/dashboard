import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import styled from "@emotion/styled"
import SideNavBar from "../components/Layout/SideNavBar/SideNavBar"
import { NavItem } from "../redux/global/global.types"
import { styleGuideRoutes } from "../routes/Styleguide"
import { mediaQuery } from "../styles/mediaQuery"

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
    <div>
      <Router>
        <Container>
          <Aside>
            <SideNavBar
              sidebarNavItems={styleGuideRoutes as NavItem[]}
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
    </div>
  )
}

export { Styleguide }
