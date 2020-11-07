import React from "react";
import { Navbar, NavbarBrand } from "shards-react";

type Props = {
  toggleSidebar: () => void;
};

export default ({ toggleSidebar }: Props) => {
  return (
    <div className="main-navbar">
      <Navbar
        className="align-items-stretch bg-white flex-md-nowrap p-0"
        type="light"
      >
        <NavbarBrand
          className="w-100 mr-0"
          href="#"
          style={{ lineHeight: "25px" }}
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
        </NavbarBrand>
        <span
          className="toggle-sidebar d-sm-inline d-md-none d-lg-none"
          onClick={toggleSidebar}
        >
          <i className="material-icons">&#xE5C4;</i>
        </span>
      </Navbar>
    </div>
  );
};
