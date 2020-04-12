import React from "react";
import { Container, Row, Nav, NavItem, NavLink } from "shards-react";
import { Link } from "react-router-dom";

const MainFooter = ({ contained, menuItems, copyright }) => (
  <footer className="main-footer d-flex p-2 px-3 bg-white border-top">
    <Container fluid>
      <Row>
        <Nav>
          {menuItems.map((item, idx) => (
            <NavItem key={idx}>
              <NavLink tag={Link} to={item.to}>
                {item.title}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
        <span className="copyright ml-auto my-auto mr-2">{copyright}</span>
      </Row>
    </Container>
  </footer>
);

MainFooter.defaultProps = {
  contained: false,
  copyright: "Copyright © Jina AI Limited",
  menuItems: [
    {
      title: "Home",
      to: "#"
    },
    {
      title: "Products",
      to: "#"
    },
    {
      title: "Learn",
      to: "#"
    },
    {
      title: "Community",
      to: "#"
    },
    {
      title: "Blog",
      to: "#"
    },
    {
      title: "Jobs",
      to: "#"
    }
  ]
};

export default MainFooter;
