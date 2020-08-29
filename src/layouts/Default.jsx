import React from "react";
import { Container, Alert, Col, Row } from "react-bootstrap";

// import Navbar from '../components/Layout/Navbar';
// import Footer from '../components/Layout/Footer';
import PasteYAML from "../modals/PasteYAML";

import { Store } from "../flux";

class DefaultLayout extends React.Component {
  constructor() {
    super();
    this.state = {
      modal: Store.getModal(),
      loading: Store.isLoading(),
    };
    Store.on("update-ui", this.getData);
  }

  componentWillUnmount = () => {
    Store.removeListener("update-ui", this.getData);
  };

  getData = () => {
    const modal = Store.getModal();
    const loading = Store.isLoading();
    this.setState({ modal, loading });
  };

  render = () => {
    const { banner, loading, modal } = this.state;
    const { children } = this.props;
    return (
      <Container fluid>
        <Row>
          {/* <Sidebar /> */}
          <Col className="main-content p-0" sm="12" tag="main">
            {/* <Navbar /> */}
            {banner && (
              <Alert theme={banner.variant} className="alert-bar py-1">
                {banner.text}
              </Alert>
            )}
            {loading ? (
              <Container fluid className="main-content-container px-4">
                <div className="error">
                  <div className="loader"></div>
                </div>
              </Container>
            ) : (
              children
            )}
            {/* <Footer /> */}
          </Col>
        </Row>
        <PasteYAML open={modal === "import"} />
      </Container>
    );
  };
}

export default DefaultLayout;
