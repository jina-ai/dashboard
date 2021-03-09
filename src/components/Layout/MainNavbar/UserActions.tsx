import React from "react"
import { Link } from "react-router-dom"
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink,
  Button,
  // @ts-ignore
} from "shards-react"

type User = {
  displayName: string
  emails: [{ value: string }]
  id: string
  nodeId: string
  photos: [{ value: string }]
  profileUrl: string
  provider: string
  username: string
  _json: {
    avatar_url: string
  }
  _raw: string
}

type Props = {
  userActionsVisible: boolean
  user: User | null
  logOut: () => void
  toggleUserActions: () => void
}

function UserActions({
  user,
  logOut,
  userActionsVisible,
  toggleUserActions,
}: Props) {
  return (
    <NavItem tag={Dropdown} caret toggle={toggleUserActions}>
      {user ? (
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
          <img
            className="user-avatar rounded-circle mr-2"
            src={user._json.avatar_url}
            alt="User Avatar"
          />{" "}
          <span className="d-none d-md-inline-block">{user.username}</span>
        </DropdownToggle>
      ) : (
        <Link to="/login" className="nav-link px-3">
          <Button className="text-nowrap mb-0 mt-1">Log in</Button>
        </Link>
      )}

      <Collapse tag={DropdownMenu} right small open={userActionsVisible}>
        <DropdownItem
          tag={Link}
          to="/"
          className="text-danger"
          onClick={logOut}
        >
          <i className="material-icons text-danger">&#xE879;</i> Logout
        </DropdownItem>
      </Collapse>
    </NavItem>
  )
}

export { UserActions }
