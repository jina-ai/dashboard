import React from "react"
import ImageCard from "./ImageCard"
import styled from "@emotion/styled"
import Card from "@material-ui/core/Card"
import Grid from "@material-ui/core/Grid"
import { useSelector } from "react-redux"
import {
  selectHubImages,
  selectIsHubImagesLoading,
} from "../../redux/hub/hub.selectors"
import SpinningLoader from "../Common/SpinningLoader"

export const SubTitle = styled.div`
  font-family: "Roboto";
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 1.75rem;
  padding-bottom: 1.25rem;
  color: ${(props) => props.theme.palette.text.primary};
`
const ImageListPreviewContainer = styled(Card)`
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: ${(props) => props.theme.palette.background.default};
`
const HubImagesListPreview = () => {
  const hubImages = useSelector(selectHubImages).slice(0, 6)
  const isHubImagesLoading = useSelector(selectIsHubImagesLoading)

  return (
    <ImageListPreviewContainer>
      {isHubImagesLoading ? (
        <SpinningLoader />
      ) : (
        <>
          <SubTitle data-name="hubImagesPreviewSubtitle">Latest</SubTitle>
          <Grid container spacing={2}>
            {hubImages.map((image, index) => (
              <Grid
                item
                xs={4}
                key={`${image.name}.${image.version}.${image["jina-version"]}`}
              >
                <ImageCard image={image} index={index} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </ImageListPreviewContainer>
  )
}

export default HubImagesListPreview
