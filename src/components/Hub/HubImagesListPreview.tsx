import React from "react"
import ImageCard from "./ImageCard"
import styled from "@emotion/styled"
import { useSelector } from "react-redux"
import { Row, Col } from "react-bootstrap"
import {
  selectHubImages,
  selectIsHubImagesLoading,
} from "../../redux/hub/hub.selectors"
import SpinningLoader from "../Common/SpinningLoader"

const SubTitle = styled.span`
  font-weight: 500;
  font-size: 1.5rem;
`

const HubImagesListPreview = () => {
  const hubImages = useSelector(selectHubImages).slice(0, 6)
  const isHubImagesLoading = useSelector(selectIsHubImagesLoading)

  return (
    <>
      {isHubImagesLoading ? (
        <SpinningLoader />
      ) : (
        <>
          <SubTitle data-name="hubImagesPreviewSubtitle">Latest</SubTitle>
          <Row>
            {hubImages.map((image, index) => (
              <Col
                key={`${image.name}.${image.version}.${image["jina-version"]}`}
                md="4"
                className="mb-4"
              >
                <ImageCard image={image} index={index} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  )
}

export default HubImagesListPreview
