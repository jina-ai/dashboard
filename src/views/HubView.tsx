import React, { useEffect } from "react"
import { Switch, Route, useRouteMatch } from "react-router-dom"
import { Container, Row } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { fetchHubImages } from "../redux/hub/hub.actions"
import { PageTitle } from "../components/Common/PageTitle"
import HubOverviewActionsContainer from "../components/Hub/HubOverviewActionsContainer"
import HubImagesListPreview from "../components/Hub/HubImagesListPreview"
import HubImagesList from "../components/Hub/HubImagesList"
import HubNavigationBar from "../components/Hub/HubNavigationBar"

const HubView = () => {
  const { path } = useRouteMatch()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchHubImages())
  }, [dispatch])

  return (
    <Container fluid className="main-content-container px-0">
      <HubNavigationBar />
      <div className="px-4">
        <Row className="page-header">
          <PageTitle title="Jina Hub" className="text-sm-left mb-3" />
        </Row>
        <Switch>
          <Route exact path={path}>
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
  )
}

export default HubView
