import React from "react";
import styled from "@emotion/styled"

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
const Footer = styled.footer`
  display: flex;
  justify-content: space-around;
`
const Link = styled.a`
  text-decoration: none;
  padding: .625rem;
  color: ${props => props.theme.palette.success.dark};
`

const MainFooter = ({
  menuItems,
  copyright,
  loggerEnabled,
  enableLogger,
  disableLogger,
  exportLogs,
}: Props) => (
  <Footer>
    <div>
      {menuItems.map((item, idx) => (
        <Link key={idx} href={item.to}>
          {item.title}
        </Link>
      ))}
    </div>
    <span>{copyright}</span>
  </Footer>
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
      title: "Open Source",
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
