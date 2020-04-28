import React from "react";
import { Container, Row, Col, Alert } from "shards-react";

import MainNavbar from "../components/Layout/MainNavbar/MainNavbar";
import MainSidebar from "../components/Layout/MainSidebar/MainSidebar";
import MainFooter from "../components/Layout/MainFooter";
import CookiesBanner from '../components/Common/CookiesBanner';

import PasteYAML from '../modals/PasteYAML';
import WriteReview from '../modals/WriteReview';

import { Store } from '../flux';

class IconSidebarLayout extends React.Component {
  state = {
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
    this.setState({ modal, loading });
  }

  render = () => {
    const { modal, loading } = this.state;
    const { noNavbar, children, noFooter } = this.props;
    return (<Container fluid className="icon-sidebar-nav">
      <Row>
        <MainSidebar hideLogoText />
        <Col className="main-content col" tag="main">
          {!noNavbar && <MainNavbar />}
          {children}
          <CookiesBanner/>
          {!noFooter && <MainFooter />}
        </Col>
      </Row>
      <PasteYAML open={modal === 'import'} />
      <WriteReview open={modal === 'review'} />
    </Container>)
  }
}

IconSidebarLayout.defaultProps = {
  noNavbar: false,
  noFooter: false
};

export default IconSidebarLayout;
