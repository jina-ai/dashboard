import React, { useEffect } from "react"
import { Switch, Route, useRouteMatch } from "react-router-dom"
import { useDispatch } from "react-redux"
import { fetchHubImages } from "../redux/hub/hub.actions"
import HubOverviewActionsContainer from "../components/Hub/HubOverviewActionsContainer"
import HubImagesListPreview from "../components/Hub/HubImagesListPreview"
import HubImagesList from "../components/Hub/HubImagesList"
import HubRecommendedCategories from "../components/Hub/HubRecommendedCategories"
import { ViewContainer } from "./LogsView"

const HubView = () => {
  const { path } = useRouteMatch()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchHubImages())
  }, [dispatch])

  return (
    <ViewContainer>
      <Switch>
        <Route exact path={path}>
          <HubOverviewActionsContainer />
          <HubRecommendedCategories />
          <HubImagesListPreview />
        </Route>
        <Route path={`${path}/explore`}>
          <HubImagesList />
        </Route>
      </Switch>
    </ViewContainer>
  )
}

export default HubView
