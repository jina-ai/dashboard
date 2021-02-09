import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import { selectHubImages } from "../redux/hub/hub.selectors";
import { Row, Col } from "react-bootstrap";
import { Card, CardBody } from "shards-react";
import ImageDetails from "../components/Hub/ImageDetails";
import Readme from "../components/Hub/Readme";

const ImageContainer = styled.div`
  padding: 0 1.75rem;
`;
const ImageTitle = styled.h2`
  color: ${props => props.theme.palette.headerTextColor}
`
const ImageDescription = styled.p`
  color: ${props => props.theme.palette.headerTextColor}
`

const PackageView = () => {
  let { packageId } = useParams<{ packageId: string }>();
  const hubImages = useSelector(selectHubImages);
  const image = hubImages[parseInt(packageId, 10)];
  return (
    <ImageContainer>
      <Row>
        <Col md="8">
          <Card>
            <ImageTitle>{image.name}</ImageTitle>
            <ImageDescription>{image.description}</ImageDescription>
          </Card>
          <Readme documentation={image.documentation} />
        </Col>
        <Col md="4">
          <ImageDetails image={image} />
        </Col>
      </Row>
    </ImageContainer>
  );
};

export default PackageView;
