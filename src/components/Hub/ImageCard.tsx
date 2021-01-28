import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import styled from "@emotion/styled"

type HubImagePreview = {
  name: string;
  author: string;
  description: string;
  keywords: string[];
};

type Props = {
  image: HubImagePreview;
};

const Tag = styled.div`
  background: #DAD7FE;
  border-radius: 6px;
  display: inline-block;
  padding: .25rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
`
const Title = styled.div`
  font-size: 1.25em;
  font-weight: 700;
  line-height: normal;
`

const SubTitle = styled.div`
  font-weight: 600;
  opacity: 0.5;
`


export default function ImageCard({ image }: Props) {
  let { name, author, keywords, description } = image;

  return (
    <Card className="clickable mb-4 h-100 image-card">
      <Card.Body className="pb-0 mb-0 pt-3">
        <Row>
          <Col xs="12" className="px-0">
            <Title className="mb-2">{name}</Title>
            { keywords.map(keyword => (<Tag key={keyword}>{keyword}</Tag>))}
            <SubTitle className="mb-2">{author}</SubTitle>
          </Col>
          <Col sm="12" className="px-0 pb-0">
            <div className="description-container">
              <div className="description-overlay" />
              <div className="app-description">{description}</div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
