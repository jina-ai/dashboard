import React from "react";
import { Row, Col, Card } from "react-bootstrap";

type HubImagePreview = {
  name: string;
  id: string;
  author: string;
  description: string;
  tags: string[];
};

type Props = {
  image: HubImagePreview;
};

export default function ImageCard({ image }: Props) {
  let { name, author, tags, description } = image;

  return (
    <Card className="clickable mb-4 h-100 image-card">
      <Card.Body className="pb-0 mb-0 pt-3">
        <Row>
          <Col xs="12" className="px-0">
            <div className="app-title mb-2">{name}</div>
            <div className="app-category mb-2">{tags}</div>
            <div className="app-subtitle mb-2">{author}</div>
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
