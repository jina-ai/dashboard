// eslint-disable-file jsx-ally/anchor-is-valid
import React from "react";
import styled from "@emotion/styled"
import { NavLink, useLocation } from "react-router-dom";
import { NavItem } from "../../../redux/global/global.types";

type Props = {
  item: NavItem;
  toggleSidebar: () => void;
};

type NavLinkWithIconProps = {
  active?: boolean;
}
const NavLinkWithIcon = styled(NavLink)<NavLinkWithIconProps>`
  display: flex;
  padding: 1rem 0;
  text-decoration: none;
  border-radius: .25rem;
  ${props => {
    const {palette} = props.theme
    return props.active ?
      `color: ${palette.primary.main};
      background-color: ${palette.primary.light};`
    : `color: ${palette.text.secondary};`}
  }
`
const NavLinkIconContainer = styled.div`
  padding: 0 1.5rem;
  width: 1.25rem;
  opacity: .75;
`

const SidebarNavItem = ({ item, toggleSidebar }: Props) => {
  const path = useLocation()?.pathname?.substring(1);
  let active = false;
  item.matches.forEach((match) => {
    if (path === match) active = true;
  });

  return (
      <NavLinkWithIcon
        to={item.to}
        active={active}
        onClick={toggleSidebar}
      >
        <NavLinkIconContainer>{item.icon && ( <item.icon />)}</NavLinkIconContainer>
        {item.title && <span>{item.title}</span>}
      </NavLinkWithIcon>
  );
};

export default SidebarNavItem;
