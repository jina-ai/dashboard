import React from "react";
import { NavItem, NavLink, Badge } from "shards-react";

export default ({ connected, reconnect }) => {
  return (
    <NavItem
      className="border-right dropdown notifications"
      onClick={reconnect}
    >
      <NavLink className="nav-link-icon text-center">
        <div className="nav-link-icon__wrapper">
          <i className="material-icons">language</i>
          {connected ? (
            <Badge pill theme="success" className="connection-indicator p-1">
              <i className="material-icons">done</i>
            </Badge>
          ) : (
            <Badge pill theme="danger" className="connection-indicator p-1">
              <i className="material-icons">close</i>
            </Badge>
          )}
        </div>
      </NavLink>
    </NavItem>
  );
};
