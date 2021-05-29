import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { TNavItem } from "../../../redux/global/global.types";

type Props = {
  item: TNavItem;
  toggleSidebar: () => void;
};

const SidebarNavItem = ({ item, toggleSidebar }: Props) => {
  const path = useLocation()?.pathname?.substring(1);
  let active = false;
  item.matches.forEach((match) => {
    if (path === match) active = true;
  });

  return (
      <NavLink
        to={item.to}
        onClick={toggleSidebar}
      >
        {item.iconName && (
          <div className="d-inline-block item-icon-wrapper">
            <i className="material-icons">{item.iconName}</i>
          </div>
        )}
        {item.title && <span>{item.title}</span>}
      </NavLink>
  );
};

export default SidebarNavItem;
