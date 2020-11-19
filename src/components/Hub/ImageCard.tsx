import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";
import { HubImage } from "./types";

type Props = {
  image: HubImage;
};

export default function ImageCard({ image }: Props) {
  let {
    name,
    id,
    official,
    author,
    description,
    totalStars,
    totalRatings,
  } = image;

  let rating;
  if (image.totalStars && image.totalRatings) {
    rating = totalStars / totalRatings;
  }

  return (
    <Link className="unstyled-link" to={`/package?id=${id}`}>
      <Card className="clickable mb-4 h-100 image-card">
        <Card.Body className="pb-0 mb-0 pt-3">
          <Row>
            <Col xs="12" className="px-0">
              <div className="app-category mb-2">search</div>
              <div className="app-title mb-2">{name}</div>
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
        <Card.Footer className="pt-0 px-3 pb-3">
          {totalRatings ? (
            <StarRating rating={rating} totalRatings={totalRatings} />
          ) : (
            <span className="text-muted">no ratings</span>
          )}
          {official && (
            <span className="float-right">
              <img src="/jina-j.png" alt="Official Package" width={30} />
            </span>
          )}
        </Card.Footer>
      </Card>
    </Link>
  );
}
