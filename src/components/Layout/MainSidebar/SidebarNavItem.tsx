import React from "react";
import { NavLink as RouteNavLink, useLocation } from "react-router-dom";
import {
  NavItem,
  NavLink,
  DropdownMenu,
  DropdownItem,
  Collapse,
} from "shards-react";

type SubItem = {
  title: string;
  to: string;
};

type NavItem = {
  title: string;
  to: string;
  open: boolean;
  iconName: string;
  matches: string[];
  items?: SubItem[];
};

type Props = {
  item: NavItem;
  toggleSidebar: () => void;
};

export default ({ item, toggleSidebar }: Props) => {
  const hasSubItems = item.items && item.items.length;
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
      {item.items && (
        <Collapse tag={DropdownMenu} small open={item.open} style={{ top: 0 }}>
          {item.items.map((subItem, idx) => (
            <DropdownItem key={idx} tag={RouteNavLink} to={subItem.to}>
              {subItem.title}
            </DropdownItem>
          ))}
        </Collapse>
      )}
    </NavItem>
  );
};
