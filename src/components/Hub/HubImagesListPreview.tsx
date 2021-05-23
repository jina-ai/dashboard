import React from "react"
import ImageCard from "./ImageCard"
import styled from "@emotion/styled"
import Card from "@material-ui/core/Card"
import { useSelector } from "react-redux"
import {
  selectHubImages,
  selectIsHubImagesLoading,
} from "../../redux/hub/hub.selectors"
import SpinningLoader from "../Common/SpinningLoader"

export const SubTitle = styled.span`
  font-weight: 500;
  font-size: 1.25rem;
  color: ${(props) => props.theme.palette.headerTextColor};
`
const ImageListPreviewContainer = styled(Card)`
  margin-top: 2rem;
  padding: 2rem;
`
const ImageListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: space-around;
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
          <ImageListContainer>
            {hubImages.map((image, index) => (
              <ImageCard
                image={image}
                index={index}
                key={`${image.name}.${image.version}.${image["jina-version"]}`}
              />
            ))}
          </ImageListContainer>
        </>
      )}
    </ImageListPreviewContainer>
  )
}

export default HubImagesListPreview
