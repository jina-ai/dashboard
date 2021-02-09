import React from "react";
import { Container, Navbar, Nav } from "shards-react";

import { NavbarSpacer } from "./NavbarSpacer";
import { NavbarToggle } from "./NavbarToggle";
import { ConnectionIndicator } from "./ConnectionIndicator";
import { NavLogo } from "./NavLogo";

export type User = {
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
  connected?: boolean;
  logOut: () => void;
  toggleSidebar?: () => void;
  reconnect?: () => void;
  user: User | null;
  hideSidebarToggle?: boolean;
  showLogo?: boolean;
};

function MainNavbar({
  usesConnection,
  toggleSidebar,
  reconnect,
  connected,
  hideSidebarToggle,
  showLogo,
}: Props) {
  return (
    <div className="main-navbar">
      <Container fluid className="p-0">
        <Navbar
          type="light"
          className="align-items-stretch flex-md-nowrap p-0 px-2"
        >
          {showLogo && <NavLogo />}
          <NavbarSpacer />
          <Nav navbar className="flex-row">
            {usesConnection && (
              <ConnectionIndicator
                reconnect={reconnect}
                connected={connected}
              />
            )}
          </Nav>
          {!hideSidebarToggle && <NavbarToggle toggleSidebar={toggleSidebar} />}
        </Navbar>
      </Container>
    </div>
  );
}

export { MainNavbar };
