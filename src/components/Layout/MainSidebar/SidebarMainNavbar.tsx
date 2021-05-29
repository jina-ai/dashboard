import React from "react";
import AppBar from "@material-ui/core/AppBar";

type Props = {
  toggleSidebar: () => void;
};

const SidebarMainNavbar = ({ toggleSidebar }: Props) => {
  return (
    <div className="main-navbar">
      <AppBar
        className="align-items-stretch bg-white flex-md-nowrap p-0"
      >
          <div className="d-table m-auto">
            <img
              id="main-logo"
              className="d-inline-block align-top"
              style={{ maxWidth: "50px" }}
              src="/jina-light.svg"
              alt="Jina Dashboard"
            />
          </div>
        <span
          className="toggle-sidebar d-sm-inline d-md-none d-lg-none"
          onClick={toggleSidebar}
        >
          <i className="material-icons">&#xE5C4;</i>
        </span>
      </AppBar>
    </div>
  );
};

export default SidebarMainNavbar;
