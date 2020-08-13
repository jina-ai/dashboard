import React from "react";
import { Container, Row, Nav, NavItem, NavLink } from "shards-react";
import { Link } from "react-router-dom";

const MainFooter = ({ contained, menuItems, copyright }) => (
  <footer className="main-footer d-flex p-2 px-3 bg-white border-top">
    <Container fluid>
      <Row>
        <Nav>
          {menuItems.map((item, idx) => (
            <a key={idx} href={item.to} className="nav-link">
              {item.title}
            </a>
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
      to: "https://jina.ai",
    },
    {
      title: "Opensource",
      to: "https://opensource.jina.ai",
    },
    {
      title: "Learn",
      to: "https://docs.jina.ai",
    },
    {
      title: "Community",
      to: "https://twitter.com/JinaAI_",
    },
    {
      title: "Jobs",
      to: "https://www.linkedin.com/company/jinaai/jobs/",
    },
    {
      title: "Privacy & Terms",
      to: "https://github.com/jina-ai/legal",
    },
  ],
};

export default MainFooter;
