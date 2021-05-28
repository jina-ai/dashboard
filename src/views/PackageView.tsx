import React from "react"
import { useParams, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import styled from "@emotion/styled"
import {
  selectHubImages,
  selectIsHubImagesLoading,
} from "../redux/hub/hub.selectors"
import { fetchHubImages } from "../redux/hub/hub.actions"
import ImageDetails, { DetailCard } from "../components/Hub/ImageDetails"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import CardContent from "@material-ui/core/CardContent"
import Readme from "../components/Hub/Readme"
import SpinningLoader from "../components/Common/SpinningLoader"

const ImageContainer = styled.div`
  font-family: "Roboto";
  padding: 0 1.75rem;
`
const NavigationButton = styled(Button)`
  text-transform: none;
  color: ${(props) => props.theme.palette.text.primary};
  font-weight: normal;
  padding: 1.25rem 0;
`
const PackageView = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  let { packageId } = useParams<{ packageId: string }>()
  const hubImages = useSelector(selectHubImages)
  const isHubImagesLoading = useSelector(selectIsHubImagesLoading)
  const image = hubImages[parseInt(packageId, 10)]
  if (hubImages.length === 0 && !isHubImagesLoading) {
    dispatch(fetchHubImages())
  }
  return (
    <>
      {" "}
      {hubImages.length === 0 ? (
        <SpinningLoader />
      ) : (
        <ImageContainer>
          <NavigationButton onClick={() => history.goBack()}>
            {" "}
            &lt; Back
          </NavigationButton>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <DetailCard>
                <CardContent>
                  <Readme documentation={image.documentation} />
                </CardContent>
              </DetailCard>
            </Grid>
            <Grid item xs={4}>
              <ImageDetails image={image} />
            </Grid>
          </Grid>
        </ImageContainer>
      )}
    </>
  )
}

export default PackageView
