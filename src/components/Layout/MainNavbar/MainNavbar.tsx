import React from "react"
import { UserActions } from "./UserActions"
import { useDispatch } from "react-redux"
import { logout } from "../../../redux/global/global.actions"
import { User } from "../../../redux/global/global.types"
import { AppBar, Toolbar } from "@material-ui/core"
import { Language as LanguageIcon } from "@material-ui/icons"
import { green, red } from "@material-ui/core/colors"
import styled from "@emotion/styled"

type Props = {
  usesAuth: boolean
  usesConnection: boolean
  connected?: boolean
  logOut: () => void
  toggleSidebar?: () => void
  reconnect?: () => void
  user: User
  hideSidebarToggle?: boolean
  showLogo?: boolean
  navigateButton?: () => React.ReactNode
}

const NavigationItems = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`

function MainNavbar({ usesConnection, reconnect, connected }: Props) {
  const dispatch = useDispatch()

  return (
    <AppBar position="static" elevation={0} color={"transparent"}>
      <Toolbar>
        <NavigationItems>
          {usesConnection && (
            <LanguageIcon
              onClick={reconnect}
              style={connected ? { color: green[500] } : { color: red[500] }}
            />
          )}
          <UserActions
            userActionsVisible={false}
            logOut={() => dispatch(logout())}
            toggleUserActions={() => {}}
          />
        </NavigationItems>
      </Toolbar>
    </AppBar>
  )
}

export { MainNavbar }
