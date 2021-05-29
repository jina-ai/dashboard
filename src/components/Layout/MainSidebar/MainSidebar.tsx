import React from "react";
import Grid from "@material-ui/core/Grid"

import SidebarMainNavbar from "./SidebarMainNavbar";
import SidebarNavItems from "./SidebarNavItems";
import { TNavItem } from "../../../redux/global/global.types";

type Props = {
  menuVisible: boolean;
  sidebarNavItems: TNavItem[];
  toggleSidebar: () => void;
};

function MainSidebar({ sidebarNavItems, toggleSidebar }: Props) {

  return (
    <Grid item lg={2} md={3}>
      <SidebarMainNavbar toggleSidebar={toggleSidebar} />
      <SidebarNavItems
        navItems={sidebarNavItems}
        toggleSidebar={toggleSidebar}
      />
    </Grid>
  );
}

export default MainSidebar;
