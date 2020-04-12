import React from "react";
import { Container, Row, Col, Alert } from "shards-react";

import MainNavbar from "../components/Layout/MainNavbar/MainNavbar";
import MainSidebar from "../components/Layout/MainSidebar/MainSidebar";
import MainFooter from "../components/Layout/MainFooter";

import { Store } from '../flux';

class IconSidebarLayout extends React.Component {
  state = {
    banner: Store.getBanner(),
    modal: Store.getModal(),
    loading: Store.isLoading(),
  }

  componentWillMount = () => {
    Store.on('update-ui', this.getData);
  }

  componentWillUnmount = () => {
    Store.removeListener('update-ui', this.getData);
  }

  getData = () => {
    const modal = Store.getModal();
    const loading = Store.isLoading();
    const banner = Store.getBanner();
    this.setState({ modal, loading, banner });
  }

  render = () => {
    const { modal, loading, banner } = this.state;
    const { noNavbar, children, noFooter } = this.props;
    return (<Container fluid className="icon-sidebar-nav">
      <Row>
        <MainSidebar hideLogoText />
        <Col className="main-content col" tag="main">
          {!noNavbar && <MainNavbar />}
          {
            banner &&
            <Alert theme={banner.theme||'info'} className="mb-0 banner">
              {banner.message}
          </Alert>
          }
          {children}
          {!noFooter && <MainFooter />}
        </Col>
      </Row>
    </Container>)
  }
}

IconSidebarLayout.defaultProps = {
  noNavbar: false,
  noFooter: false
};

export default IconSidebarLayout;
