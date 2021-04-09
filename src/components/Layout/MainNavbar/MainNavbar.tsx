import React from "react"
import { Container, Navbar, Nav } from "shards-react"
import { NavbarSpacer } from "./NavbarSpacer"
import { ConnectionIndicator } from "./ConnectionIndicator"
import { NavLogo } from "./NavLogo"
import { UserActions } from "./UserActions"
import { useDispatch } from "react-redux"
import { logout } from "../../../redux/global/global.actions"
import { User } from "../../../redux/global/global.types"

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

function MainNavbar({
  usesConnection,
  reconnect,
  connected,
  showLogo,
  navigateButton,
}: Props) {
  const dispatch = useDispatch()
  return (
    <div className="main-navbar">
      <Container fluid className="p-0">
        <Navbar
          type="light"
          className="align-items-stretch flex-md-nowrap p-0 px-2"
        >
          {showLogo && <NavLogo />}
          {navigateButton && navigateButton()}

          <NavbarSpacer />
          <Nav navbar className="flex-row">
            {usesConnection && (
              <ConnectionIndicator
                reconnect={reconnect}
                connected={connected}
              />
            )}
            <UserActions
              userActionsVisible={false}
              logOut={() => dispatch(logout())}
              toggleUserActions={() => {}}
            />
          </Nav>
        </Navbar>
      </Container>
    </div>
  )
}

export { MainNavbar }
