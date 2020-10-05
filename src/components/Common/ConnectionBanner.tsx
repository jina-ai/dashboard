import React from "react";
import { Button, Row, Col } from "react-bootstrap";

type Props = {
  loading: boolean;
  connected: boolean;
  reconnect: () => void;
};

function ConnectionBanner({ loading, connected, reconnect }: Props) {
  if (loading || connected) return null;
  return (
    <div className="mb-0 banner px-3 banner-warning">
      <Row>
        <Col md="8" className="my-1">
          Could not connect to Jina instance. Please make sure your{" "}
          <a href="#/settings">settings</a> are configured correctly.
        </Col>
        <Col md="4" className="text-right">
          <a
            href="https://github.com/jina-ai/dashboard#getting-started"
            target="_blank"
            rel="noopener noreferrer"
            className="mr-2"
          >
            <Button variant="light">View Docs</Button>
          </a>
          <Button variant="primary" onClick={reconnect}>
            <i className="material-icons mr-1">refresh</i>Try Again
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export { ConnectionBanner };
