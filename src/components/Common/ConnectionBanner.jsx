import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default ({ loading, connected, reconnect }) => {
  return loading || connected ? (
    ""
  ) : (
    <div className="mb-0 banner px-3 banner-warning">
      <Row>
        <Col md="8" className="my-1">
          Could not connect to Jina instance. Please make sure your{" "}
          <a href="#/settings">settings</a> are configured correctly.
        </Col>
        <Col md="4" className="text-right">
          <Link to="/connection-guide" className="mr-2">
            <Button variant="light">Connection Guide</Button>
          </Link>
          <Button variant="primary" onClick={reconnect}>
            <i className="material-icons mr-1">refresh</i>Try Again
          </Button>
        </Col>
      </Row>
    </div>
  );
};
