import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectUser } from "../../../redux/global/global.selectors"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import { Avatar, IconButton } from "@material-ui/core"
import { AccountCircle } from "@material-ui/icons"

type Props = {
  userActionsVisible: boolean
  logOut: () => void
  toggleUserActions: () => void
}

function UserActions({ logOut, userActionsVisible, toggleUserActions }: Props) {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenu = () => {
    setAnchorEl(null)
    if (user) dispatch(logOut)
    else window.location.href = "/#login"
  }

  return (
    <>
      <IconButton
        data-name={"menuButton"}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {user ? (
          <Avatar src={user._json.avatar_url} alt="User Avatar" />
        ) : (
          <AccountCircle />
        )}
      </IconButton>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenu}
      >
        <MenuItem data-name={"loginLogout"} onClick={handleMenu}>
          {user ? "Logout" : "Login"}
        </MenuItem>
      </Menu>
    </>
  )
}

export { UserActions }
