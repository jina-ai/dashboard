import React, { useEffect } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { useDispatch } from "react-redux";
import { fetchHubImages } from "../redux/hub/hub.actions";
import HubOverviewActionsContainer from "../components/Hub/HubOverviewActionsContainer";
import HubImagesListPreview from "../components/Hub/HubImagesListPreview";
import HubImagesList from "../components/Hub/HubImagesList";

const HubView = () => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchHubImages());
  }, [dispatch]);

  return (
    <Container>
      <div className="px-4">
        <Switch>
          <Route exact path={path}>
            <HubOverviewActionsContainer />
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
