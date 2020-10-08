import React from "react";

type Props = {
  toggleSidebar: () => void;
};

function NavbarToggle({ toggleSidebar }: Props) {
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

export { NavbarToggle };
