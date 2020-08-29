import React from "react";
import { Container, Navbar, Nav } from "shards-react";

import NavbarSpacer from "./NavbarSpacer";
import NavbarToggle from "./NavbarToggle";
import Notifications from "./Notifications";
import UserActions from "./UserActions";
import { Store, Dispatcher, Constants } from "../../../flux";

class MainNavbar extends React.Component {
  constructor() {
    super();
    this.state = {
      userActionsVisible: false,
      connected: Store.getConnectionStatus(),
      user: Store.getUser(),
    };
    Store.on("update-ui", this.getData);
    Store.on("update-user", this.getData);
  }

  componentWillUnmount = () => {
    Store.removeListener("update-ui", this.getData);
    Store.removeListener("update-user", this.getData);
  };

  getData = () => {
    const connected = Store.getConnectionStatus();
    const user = Store.getUser();
    this.setState({ connected, user });
  };

  reconnect = () => {
    Dispatcher.dispatch({
      actionType: Constants.RECONNECT,
    });
  };

  toggleUserActions = () => {
    this.setState({
      userActionsVisible: !this.state.userActionsVisible,
    });
  };

  logOut = () => {
    Dispatcher.dispatch({
      actionType: Constants.LOG_OUT,
    });
  };

  toggleSidebar = () => {
    Dispatcher.dispatch({
      actionType: Constants.TOGGLE_SIDEBAR,
    });
  };
  render = () => {
    const { connected, user, userActionsVisible } = this.state;
    return (
      <div className="main-navbar bg-white sticky-top">
        <Container fluid className="p-0">
          <Navbar
            type="light"
            className="align-items-stretch flex-md-nowrap p-0"
          >
            <NavbarSpacer />
            <Nav navbar className="border-left flex-row">
              <Notifications reconnect={this.reconnect} connected={connected} />
              <UserActions
                user={user}
                userActionsVisible={userActionsVisible}
                toggleUserActions={this.toggleUserActions}
                logOut={this.logOut}
              />
            </Nav>
            <NavbarToggle toggleSidebar={this.toggleSidebar} />
          </Navbar>
        </Container>
      </div>
    );
  };
}

export default MainNavbar;
