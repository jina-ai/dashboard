import React from "react";
import classNames from "classnames";
import { Col } from "shards-react";

import SidebarMainNavbar from "./SidebarMainNavbar";
import SidebarNavItems from "./SidebarNavItems";

type Props = {
  menuVisible: boolean;
  sidebarNavItems: any;
  toggleSidebar: () => void;
};

function MainSidebar({ menuVisible, sidebarNavItems, toggleSidebar }: Props) {
  const classes = classNames(
    "main-sidebar",
    "px-0",
    "col-12",
    menuVisible && "open"
  );

  return (
    <Col tag="aside" className={classes} lg={{ size: 2 }} md={{ size: 3 }}>
      <SidebarMainNavbar toggleSidebar={toggleSidebar} />
      <SidebarNavItems
        navItems={sidebarNavItems}
        toggleSidebar={toggleSidebar}
      />
    </Col>
  );
}

export default MainSidebar;
