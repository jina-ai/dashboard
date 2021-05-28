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
const ImageListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: space-around;
`
const Col = styled.div`
  width: 30%;
  margin-bottom: 1.5rem;
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
              <Col
                key={`${image.name}.${image.version}.${image["jina-version"]}`}
              >
                <ImageCard image={image} index={index} />
              </Col>
            ))}
          </ImageListContainer>
        </>
      )}
    </ImageListPreviewContainer>
  )
}

export default HubImagesListPreview
