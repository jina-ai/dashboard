import React from "react";

export default function NavbarToggle({ toggleSidebar }) {
  return (
    <nav className="nav cursor-pointer">
      <span
        onClick={toggleSidebar}
        className="nav-link nav-link-icon toggle-sidebar d-sm-inline d-md-inline d-lg-none text-center"
      >
        <i className="material-icons">&#xE5D2;</i>
      </span>
    </nav>
  );
}
