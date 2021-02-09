import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "@emotion/styled";
import {
  selectHubImages,
  selectIsHubImagesLoading,
} from "../redux/hub/hub.selectors";
import { fetchHubImages } from "../redux/hub/hub.actions";
import { Row, Col } from "react-bootstrap";
import { Card } from "shards-react";
import ImageDetails from "../components/Hub/ImageDetails";
import Readme from "../components/Hub/Readme";
import SpinningLoader from "../components/Common/SpinningLoader";

const ImageContainer = styled.div`
  padding: 0 1.75rem;
`;
const ImageTitle = styled.h2`
  color: ${(props) => props.theme.palette.headerTextColor};
  padding: 1rem;
`;
const ImageDescription = styled.p`
  color: ${(props) => props.theme.palette.headerTextColor};
  padding: 1rem;
`;

const PackageView = () => {
  const dispatch = useDispatch();
  let { packageId } = useParams<{ packageId: string }>();
  const hubImages = useSelector(selectHubImages);
  const isHubImagesLoading = useSelector(selectIsHubImagesLoading);
  const image = hubImages[parseInt(packageId, 10)];
  if (hubImages.length === 0 && !isHubImagesLoading) {
    dispatch(fetchHubImages());
  }
  return (
    <>
      {" "}
      {hubImages.length === 0 ? (
        <SpinningLoader />
      ) : (
        <ImageContainer>
          <Row>
            <Col md="8">
              <Card>
                <ImageTitle data-name="imageOverviewTitle">
                  {image.name}
                </ImageTitle>
                <ImageDescription data-name="imageOverviewDescription">
                  {image.description}
                </ImageDescription>
              </Card>
              <Readme documentation={image.documentation} />
            </Col>
            <Col md="4">
              <ImageDetails image={image} />
            </Col>
          </Row>
        </ImageContainer>
      )}
    </>
  );
};

export default PackageView;
