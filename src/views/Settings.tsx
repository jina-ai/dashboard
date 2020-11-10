import React from "react";
import { Container, Row } from "react-bootstrap";
import { PageTitle } from "../components/Common/PageTitle";
import SettingsCard from "../components/Settings/Settings";

class SettingsView extends React.Component {
  render = () => {
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header mb-4">
          <PageTitle
            title="Settings"
            className="text-sm-left mb-3"
          />
        </Row>
        <SettingsCard />
      </Container>
    );
  };
}

export default SettingsView;
