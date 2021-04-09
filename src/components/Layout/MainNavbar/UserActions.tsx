import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectUser } from "../../../redux/global/global.selectors"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import { Button } from "@material-ui/core"

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
  const handleClose = () => {
    setAnchorEl(null)
    dispatch(logOut)
  }

  return (
    <div>
      {user ? (
        <img
          className="user-avatar rounded-circle mr-2"
          src={user._json.avatar_url}
          alt="User Avatar"
          onClick={handleClick}
        />
      ) : (
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={() => (window.location.href = "/#login")}
        >
          Login
        </Button>
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
