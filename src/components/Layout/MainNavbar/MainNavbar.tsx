import React, { useState } from "react";
// @ts-ignore
import { Container, Navbar, Nav } from "shards-react";

import { NavbarSpacer } from "./NavbarSpacer";
import { NavbarToggle } from "./NavbarToggle";
import { ConnectionIndicator } from "./ConnectionIndicator";
import { UserActions } from "./UserActions";

type User = {
  displayName: string;
  emails: [{ value: string }];
  id: string;
  nodeId: string;
  photos: [{ value: string }];
  profileUrl: string;
  provider: string;
  username: string;
  _json: any;
  _raw: any;
};

type Props = {
  usesAuth: boolean;
  usesConnection: boolean;
  connected: boolean;
  logOut: () => void;
  toggleSidebar: () => void;
  reconnect: () => void;
  user: User | null;
};

function MainNavbar({
  usesAuth,
  usesConnection,
  logOut,
  toggleSidebar,
  reconnect,
  connected,
  user,
}: Props) {
  const [userActionsVisible, setUserActionsVisible] = useState(false);
  function toggleUserActions() {
    setUserActionsVisible((isVisible) => !isVisible);
  }
  return (
    <div className="main-navbar">
      <Container fluid className="p-0">
        <Navbar type="light" className="align-items-stretch flex-md-nowrap p-0 px-2">
          <NavbarSpacer />
          <Nav navbar className="flex-row">
            {usesConnection && (
              <ConnectionIndicator
                reconnect={reconnect}
                connected={connected}
              />
            )}
            {usesAuth && (
              <UserActions
                user={user}
                userActionsVisible={userActionsVisible}
                toggleUserActions={toggleUserActions}
                logOut={logOut}
              />
            )}
          </Nav>
          <NavbarToggle toggleSidebar={toggleSidebar} />
        </Navbar>
      </Container>
    </div>
  );
}

export { MainNavbar };
