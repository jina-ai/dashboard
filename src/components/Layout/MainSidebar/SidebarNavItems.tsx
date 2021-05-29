import React from "react";
import SidebarNavItem from "./SidebarNavItem";
import { TNavItem } from "../../../redux/global/global.types";

type Props = {
  navItems: TNavItem[];
  toggleSidebar: () => void;
};

const SidebarNavItems = ({ navItems: items, toggleSidebar }: Props) => {
  return (
    <div className="nav-wrapper">
      {typeof items !== "undefined" && items.length && (
        <div className="nav--no-borders flex-column">
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
};

export default SidebarNavItems;
