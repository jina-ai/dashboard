import React from "react";
import classNames from "classnames";
import { Container, Navbar, NavbarBrand } from "shards-react";

import NavbarSpacer from "./NavbarSpacer";
import NavbarNav from "./NavbarNav/NavbarNav";
import NavbarToggle from "./NavbarToggle";

const MainNavbar = ({ layout, stickyTop }) => {
  const isHeaderNav = false;
  const classes = classNames("main-navbar", "bg-white", "sticky-top");

  return (
    <div className={classes}>
      <Container fluid={!isHeaderNav || null} className="p-0">
        <Navbar type="light" className="align-items-stretch flex-md-nowrap p-0">
          {isHeaderNav && (
            <NavbarBrand href="#" style={{ lineHeight: "25px" }}>
              <div className="d-table m-auto">
                <img
                  id="main-logo"
                  className="d-inline-block align-top mr-1 ml-3"
                  style={{ maxWidth: "25px" }}
                  src={require("../../../images/jina-light.svg")}
                  alt="Jina.ai"
                />
                <span className="d-none d-md-inline ml-1">Dashboard</span>
              </div>
            </NavbarBrand>
          )}
          <NavbarSpacer />
          <NavbarNav />
          <NavbarToggle />
        </Navbar>
      </Container>
    </div>
  );
};

export default MainNavbar;
