import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default ({ connected, reconnect }) => {
  return connected ? (
    ""
  ) : (
    <div className="mr-4">
      <div className="mb-0 banner px-3 banner-warning">
        <Row>
          <Col md="6" className="my-1">
            Could not connect to Jina instance. Please make sure your{" "}
            <a href="#/settings">settings</a> are configured correctly.
          </Col>
          <Col md="6" className="text-right">
            <Link to="/connection-guide" className="mr-2">
              <Button variant="light">Getting Started</Button>
            </Link>
            <Button variant="primary" onClick={reconnect}>
              <i className="material-icons mr-1">refresh</i>Try Again
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};
