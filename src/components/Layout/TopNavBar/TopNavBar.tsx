import React from "react"
import { UserActions } from "./UserActions"
import { useDispatch } from "react-redux"
import { logout } from "../../../redux/global/global.actions"
import { User } from "../../../redux/global/global.types"
import AppBar from "@material-ui/core/AppBar"
import LanguageIcon from "@material-ui/icons/Language"
import { green, red } from "@material-ui/core/colors"
import styled from "@emotion/styled"
import NavLogo from "./NavLogo"

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
const NavBar = styled(AppBar)`
  background: ${(props) => props.theme.palette.background.default};
  border-bottom: 1px solid ${(props) => props.theme.palette.grey[300]};
  box-shadow: none;
  display: flex;
  flex-direction: row;
  position: unset;
`
const NavigationItems = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`

function TopNavBar({ usesConnection, reconnect, connected }: Props) {
  const dispatch = useDispatch()

  return (
    <NavBar>
      <NavLogo />
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
    </NavBar>
  )
}

export default TopNavBar
