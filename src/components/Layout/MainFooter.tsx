import React from "react";
import { Container, Row, Nav } from "shards-react";

type MenuItems = {
  title: string;
  to: string;
};

type Props = {
  menuItems: MenuItems[];
  copyright: string;
  loggerEnabled: boolean;
  enableLogger: () => void;
  disableLogger: () => void;
  exportLogs: () => void;
};

const MainFooter = ({
  menuItems,
  copyright,
  loggerEnabled,
  enableLogger,
  disableLogger,
  exportLogs,
}: Props) => (
  <footer className="main-footer d-flex p-2 px-3 bg-white border-top">
    <Container fluid>
      <Row>
        <Nav>
          {menuItems.map((item, idx) => (
            <a key={idx} href={item.to} className="nav-link">
              {item.title}
            </a>
          ))}
          {loggerEnabled ? (
            <>
              <span
                className="nav-link text-warning cursor-pointer"
                onClick={disableLogger}
              >
                Exit Debug Mode
              </span>
              <span
                className="nav-link text-warning cursor-pointer"
                onClick={exportLogs}
              >
                Export Debug Data
              </span>
            </>
          ) : (
            <span
              className="nav-link text-warning cursor-pointer"
              onClick={enableLogger}
            >
              Debug Mode
            </span>
          )}
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
