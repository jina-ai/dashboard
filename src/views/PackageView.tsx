import React from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import styled from "@emotion/styled"
import {
  selectHubImages,
  selectIsHubImagesLoading,
} from "../redux/hub/hub.selectors"
import { fetchHubImages } from "../redux/hub/hub.actions"
import ImageDetails, { DetailCard } from "../components/Hub/ImageDetails"
import Grid from "@material-ui/core/Grid"
import CardContent from "@material-ui/core/CardContent"
import Readme from "../components/Hub/Readme"
import SpinningLoader from "../components/Common/SpinningLoader"

const ImageContainer = styled.div`
  font-family: "Roboto";
  padding: 0 1.75rem;
`
const PackageView = () => {
  const dispatch = useDispatch()
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
