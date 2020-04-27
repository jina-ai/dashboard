import React from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink,
  Button
} from "shards-react";
import { Store, Dispatcher, Constants } from '../../../../flux';

export default class UserActions extends React.Component {
  state = {
    visible: false,
    user: Store.getUser()
  }
  componentWillMount = () => {
    Store.on('update-user', this.getData)
  }

  componentWillUnmount = () => {
    Store.removeListener('update-user', this.getData)
  }

  getData = () => {
    const user = Store.getUser();
    this.setState({ user });
  }

  toggleUserActions = () => {
    this.setState({
      visible: !this.state.visible
    });
  }

  logOut = () => {
    Dispatcher.dispatch({
      actionType: Constants.LOG_OUT
    })
  }

  render() {
    const { user } = this.state;
    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        {
          user ?
            <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
              <img
                className="user-avatar rounded-circle mr-2"
                src={user._json.avatar_url}
                alt="User Avatar"
              />{" "}
              <span className="d-none d-md-inline-block">{user.username}</span>
            </DropdownToggle>
            :
            <Link to="/login" className="nav-link px-3">
              <Button className="text-nowrap mb-0 mt-1">Log in</Button>
            </Link>
        }

        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          <DropdownItem tag={Link} to="/" className="text-danger" onClick={this.logOut}>
            <i className="material-icons text-danger">&#xE879;</i> Logout
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}
