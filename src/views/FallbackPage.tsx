import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FallbackProps } from "react-error-boundary";
import { PageTitle } from "../components/Common/PageTitle";
import { Button } from "shards-react";

function FallbackPage({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <Container fluid className="main-content-container p-5">
      <Row noGutters className="page-header py-4">
        <PageTitle
          title="Error"
          subtitle="This should not have happened"
          className="text-sm-left my-3"
        />
      </Row>
      <Row noGutters className="page-header py-4">
        <Col xs="12" sm="3">
          <p>Something went wrong:</p>
          <pre>
            <code className="text-warning">{error!.message}</code>
          </pre>
        </Col>
      </Row>
      <Row noGutters className="page-header">
        <Col>
          <Button onClick={resetErrorBoundary}>Try again</Button>
        </Col>
      </Row>
    </Container>
  );
}

export { FallbackPage };
