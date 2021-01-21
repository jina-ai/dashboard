import React from "react";
import { NavLink as RouteNavLink, useLocation } from "react-router-dom";
import { NavItem, NavLink } from "shards-react";
import { TNavItem } from "../../../redux/global/global.types";

type Props = {
  item: TNavItem;
  toggleSidebar: () => void;
};

const SidebarNavItem = ({ item, toggleSidebar }: Props) => {
  const hasSubItems = false;
  const path = useLocation()?.pathname?.substring(1);
  let active = false;
  item.matches.forEach((match) => {
    if (path === match) active = true;
  });

  return (
    <NavItem style={{ position: "relative" }}>
      <NavLink
        className={hasSubItems && "dropdown-toggle"}
        tag={hasSubItems ? "a" : RouteNavLink}
        to={hasSubItems ? "#" : item.to}
        active={active}
        onClick={toggleSidebar}
      >
        {item.iconName && (
          <div className="d-inline-block item-icon-wrapper">
            <i className="material-icons">{item.iconName}</i>
          </div>
        )}
        {item.title && <span>{item.title}</span>}
      </NavLink>
    </NavItem>
  );
};

export default SidebarNavItem;
