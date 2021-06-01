import React from "react";
import styled from "@emotion/styled"

const LogoContainer = styled.div`
  padding: .5rem 1.5rem;
`
const Logo = styled.img`
  width: 4.5rem;
`

const NavLogo = () => {
  return (
    <a href="#">
      <LogoContainer>
        <Logo
          id="main-logo"
          src="/jina-light.svg"
          alt="Jina logo"
        />
      </LogoContainer>
    </a>
  );
}

export default NavLogo
