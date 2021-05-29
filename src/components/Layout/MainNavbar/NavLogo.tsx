import React from "react";

function NavLogo() {
  return (
    <a href="#" style={{ lineHeight: "25px" }}>
      <div className="d-table m-auto">
        <img
          id="main-logo"
          className="d-inline-block align-top mr-1 ml-3"
          style={{ maxWidth: "25px" }}
          src="/icon.png"
          alt="Jina"
        />
      </div>
    </a>
  );
}

export { NavLogo };
