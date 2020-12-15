import React from "react";
// @ts-ignore
import { NavbarBrand } from "shards-react";

function NavLogo() {
  return (
    <NavbarBrand href="#" style={{ lineHeight: "25px" }}>
      <div className="d-table m-auto">
        <img
          id="main-logo"
          className="d-inline-block align-top mr-1 ml-3"
          style={{ maxWidth: "25px" }}
          src="/icon.png"
          alt="Jina"
        />
      </div>
    </NavbarBrand>
  );
}

export { NavLogo };
