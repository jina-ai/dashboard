import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";

class Footer extends React.Component {
  render = () => {
    return (
      <Navbar variant="light" expand="lg" fixed="bottom" className="py-0">
          <Container fluid>
            <Navbar.Brand href="#home">
              <b>Jina</b>.ai
          </Navbar.Brand>
              <div className="d-flex mr-auto">
                <Nav.Link href="#home">Documentation</Nav.Link>
                <Nav.Link href="#link">Support</Nav.Link>
              </div>
          </Container>
        </Navbar>
    )
  }
}

export default Footer;
