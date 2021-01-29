import React from "react";
import { Switch,  Route,  useRouteMatch } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import { PageTitle } from "../components/Common/PageTitle";
import HubOverviewActionsContainer from "../components/Hub/HubOverviewActionsContainer";
import HubImagesListPreview from "../components/Hub/HubImagesListPreview";
import HubImagesList from "../components/Hub/HubImagesList";

const HubView = () => {
  const {path} = useRouteMatch()
  return (
    <Container fluid className="main-content-container px-0">
      <div className="px-4">
        <Switch>
          <Route exact path={path}>

        <Row className="page-header">
          <PageTitle title="Jina Hub" className="text-sm-left mb-3" />
        </Row>
        <Row>
          <HubOverviewActionsContainer />
        </Row>
        <HubImagesListPreview />
          </Route>
          <Route path={`${path}/explore`}>

        <HubImagesList />
          </Route>
        </Switch>
      </div>
    </Container>
  );
};

export default HubView;
