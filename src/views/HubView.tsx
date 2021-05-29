import React, { useEffect } from "react"
import { Switch, Route, useRouteMatch } from "react-router-dom"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import { useDispatch } from "react-redux"
import { fetchHubImages } from "../redux/hub/hub.actions"
import { PageTitle } from "../components/Common/PageTitle"
import HubOverviewActionsContainer from "../components/Hub/HubOverviewActionsContainer"
import HubImagesListPreview from "../components/Hub/HubImagesListPreview"
import HubImagesList from "../components/Hub/HubImagesList"

const HubView = () => {
  const { path } = useRouteMatch()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchHubImages())
  }, [dispatch])

  return (
    <Container className="main-content-container px-0">
      <div className="px-4">
        <Grid container className="page-header">
          <PageTitle title="Jina Hub" className="text-sm-left mb-3" />
        </Grid>
        <Switch>
          <Route exact path={path}>
            <Grid container>
              <HubOverviewActionsContainer />
            </Grid>
            <HubImagesListPreview />
          </Route>
          <Route path={`${path}/explore`}>
            <HubImagesList />
          </Route>
        </Switch>
      </div>
    </Container>
  )
}

export default HubView
