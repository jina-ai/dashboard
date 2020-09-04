import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default ({}) => {
  return (
    <div className="mr-4">
      <div className="mb-0 banner px-4 banner-warning">
        <Row>
          <Col md="6">Could not connect to Jina instance.</Col>
          <Col md="6">
            <Link to="/connection-guide">
              <Button variant="primary">Connect</Button>
            </Link>
          </Col>
        </Row>
      </div>
    </div>
  );
};
