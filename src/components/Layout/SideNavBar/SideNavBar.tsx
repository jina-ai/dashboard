import React from "react"
import styled from "@emotion/styled"
import SidebarNavItem from "./SidebarNavItem"
import NavLogo from "../SideNavBar/NavLogo"
import { NavItem } from "../../../redux/global/global.types"

type Props = {
  sidebarNavItems: NavItem[]
  toggleSidebar: () => void
}
const SideNavBarContainer = styled.div`
  height: 100vh;
  background-color: ${(props) => props.theme.palette.background.default};
  border: 1px solid ${(props) => props.theme.palette.grey[300]};
  border-top: 0;
`

const SideNavBar = ({ sidebarNavItems: items, toggleSidebar }: Props) => (
  <SideNavBarContainer>
    <NavLogo />
    {typeof items !== "undefined" && items.length && (
      <div>
        {items.map((item, idx) => (
          <SidebarNavItem key={idx} item={item} toggleSidebar={toggleSidebar} />
        ))}
      </div>
    )}
  </SideNavBarContainer>
)

export default SideNavBar