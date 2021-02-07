import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import { selectHubImages } from "../redux/hub/hub.selectors";
import { Row, Col } from "react-bootstrap";
import ImageDetails from "../components/Hub/ImageDetails";
// import Readme from "../components/Hub/Readme";
// import CopyCommand from "../components/Hub/CopyCommand";
// import { copyToClipboard } from "../helpers";

const ImageContainer = styled.div`
  padding: 0 1.75rem;
`;

const PackageView = () => {
  let { packageId } = useParams<{ packageId: string }>();
  const hubImages = useSelector(selectHubImages);
  const image = hubImages[parseInt(packageId, 10)];
  return (
    <ImageContainer>
      <Row>
        <Col md="8"></Col>
        <Col md="4">
          <ImageDetails image={image} />
        </Col>
      </Row>
    </ImageContainer>
  );
};

export default PackageView;
