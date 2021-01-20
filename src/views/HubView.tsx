import React from "react";
import { Container, Row } from "react-bootstrap";
import { PageTitle } from "../components/Common/PageTitle";
import HubOverviewActionsContainer from "../components/Hub/HubOverviewActionsContainer";
import HubImagesList from "../components/Hub/HubImagesList";

const HubView = () => {
  return (
    <Container fluid className="main-content-container px-0">
      <div className="px-4">
        <Row className="page-header">
          <PageTitle title="Jina Hub" className="text-sm-left mb-3" />
        </Row>
        <Row>
          <HubOverviewActionsContainer />
        </Row>
        <HubImagesList />
      </div>
    </Container>
  );
};

export default HubView;
