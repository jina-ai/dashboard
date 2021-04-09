import React from "react"
import { useSelector } from "react-redux"
import { selectUser } from "../../../redux/global/global.selectors"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"

type Props = {
  userActionsVisible: boolean
  logOut: () => void
  toggleUserActions: () => void
}

function UserActions({ logOut, userActionsVisible, toggleUserActions }: Props) {
  const user = useSelector(selectUser)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      {user._json?.avatar_url && (
        <img
          className="user-avatar rounded-circle mr-2"
          src={user._json.avatar_url}
          alt="User Avatar"
          onClick={handleClick}
        />
      )}
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  )
}

export { UserActions }
