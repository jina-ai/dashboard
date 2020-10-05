import React from "react";
// @ts-ignore
import { NavItem, NavLink, Badge } from "shards-react";

type Props = {
  connected: boolean;
  reconnect: () => void;
};

function ConnectionIndicator({ connected, reconnect }: Props) {
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
}

export { ConnectionIndicator };
