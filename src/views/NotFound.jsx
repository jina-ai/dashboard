import React from "react";
import { Container, Row, Col } from "shards-react";
import { HelpCard } from "../components/Common/HelpCard";
import PageTitle from "../components/Common/PageTitle";

const Errors = () => (
  <Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-4">
      <PageTitle
        title="Resources"
        subtitle="Jina.ai"
        className="text-sm-left mb-3"
      />
    </Row>
    <Row>
      <Col md="3" className="mb-4">
        <HelpCard
          title="Jina 101"
          content="Understanding all key concepts of Jina in 3 minutes!"
          link="https://101.jina.ai"
          icon="fas fa-egg"
          theme="warning"
        />
      </Col>
      <Col md="3" className="mb-4">
        <HelpCard
          title="Jina Documentations"
          content="The best way to learn Jina in depth."
          link="https://docs.jina.ai"
          icon="fas fa-book"
          theme="primary"
        />
      </Col>
      <Col md="3" className="mb-4">
        <HelpCard
          title='Jina "Hello World"'
          content="A simple demo of image neural search for Fashion-MNIST."
          link="https://github.com/jina-ai/jina#jina-hello-world-"
          icon="fas fa-globe-europe"
          theme="error"
        />
      </Col>
      <Col md="3" className="mb-4">
        <HelpCard
          title="Visit us on Github!"
          content="Explore more exciting open-source projects from us."
          link="https://opensource.jina.ai"
          icon="fab fa-github"
          theme="info"
        />
      </Col>
      <Col md="3" className="mb-4">
        <HelpCard
          title="We are hiring!"
          content="Join us and build the next neural search eco system!"
          link="https://www.linkedin.com/company/jinaai/jobs/"
          icon="fab fa-linkedin"
          theme="linkedin"
        />
      </Col>
    </Row>
  </Container>
);

export default Errors;
