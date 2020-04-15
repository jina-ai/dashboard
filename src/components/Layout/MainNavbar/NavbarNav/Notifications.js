import React from "react";
import { NavItem, NavLink, Badge, Collapse, DropdownItem } from "shards-react";
import { Store, Constants,Dispatcher } from '../../../../flux';

export default class Notifications extends React.Component {
  state = {
    connected: Store.getConnectionStatus()
  }

  componentWillMount = () => {
    Store.on('update-ui',this.getData);
  }

  componentWillUnmount = () => {
    Store.removeListener('update-ui',this.getData);
  }

  getData = () =>{
    const connected = Store.getConnectionStatus();
    this.setState({connected});
  }

  reconnect = () =>{
    Dispatcher.dispatch({
      actionType: Constants.RECONNECT
    })
  }

  render() {
    const { connected } = this.state;
    return (
      <NavItem className="border-right dropdown notifications" onClick={this.reconnect}>
        <NavLink
          className="nav-link-icon text-center"
          onClick={this.toggleNotifications}
        >
          <div className="nav-link-icon__wrapper">
            <i className="material-icons">language</i>
            {
              connected ?
                <Badge pill theme="success" className="connection-indicator p-1">
                  <i className="material-icons">done</i>
                </Badge>
                :
                <Badge pill theme="danger" className="connection-indicator p-1">
                  <i className="material-icons">close</i>
                </Badge>
            }

          </div>
        </NavLink>
      </NavItem>
    );
  }
}
