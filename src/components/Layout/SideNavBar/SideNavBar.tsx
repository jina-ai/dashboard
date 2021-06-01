import React from "react";
import SidebarNavItem from "./SidebarNavItem";
import { NavItem } from "../../../redux/global/global.types";

type Props = {
  sidebarNavItems: NavItem[];
  toggleSidebar: () => void;
};

const MainSidebar = ({ sidebarNavItems: items, toggleSidebar }: Props) => (
  <div>
    {typeof items !== "undefined" && items.length && (
      <div>
        {items.map((item, idx) => (
          <SidebarNavItem
            key={idx}
            item={item}
            toggleSidebar={toggleSidebar}
          />
        ))}
      </div>
    )}
  </div>
);

export default MainSidebar;
