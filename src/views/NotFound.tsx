import React from "react";
import   Container  from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid"
import { HelpCard } from "../components/Common/HelpCard";
import { PageTitle } from "../components/Common/PageTitle";

const NotFound = () => (
  <Container className="main-content-container px-4" data-name="helpPage">
    <Grid container className="page-header mb-4">
      <PageTitle title="Resources" className="text-sm-left mb-3" />
    </Grid>
    <Grid container>
      <Grid item md={4} lg={3} className="mb-4">
        <HelpCard
          title="Jina 101"
          content="Understanding all key concepts of Jina in 3 minutes!"
          link="https://101.jina.ai"
          icon="fas fa-egg"
          theme="warning"
          dataName="jina-101-card"
        />
      </Grid>
      <Grid item md={4} lg={3} className="mb-4">
        <HelpCard
          title="Jina Docs"
          content="The best way to learn Jina in depth."
          link="https://docs.jina.ai"
          icon="fas fa-book"
          theme="primary"
          dataName="jina-docs-card"
        />
      </Grid>
      <Grid item md={4} lg={3} className="mb-4">
        <HelpCard
          title='Jina "Hello World"'
          content="A simple demo of image neural search for Fashion-MNIST."
          link="https://github.com/jina-ai/jina#jina-hello-world-"
          icon="fas fa-globe-europe"
          theme="error"
          dataName="jina-hello-world-card"
        />
      </Grid>
      <Grid item md={4} lg={3} className="mb-4">
        <HelpCard
          title={
            <span>
              Visit us on <span className="text-nowrap">Github!</span>
            </span>
          }
          content="Explore more exciting open-source projects from us."
          link="https://opensource.jina.ai"
          icon="fab fa-github"
          theme="info"
          dataName="jina-github-card"
        />
      </Grid>
      <Grid item md={4} lg={3} className="mb-4">
        <HelpCard
          title="We are hiring!"
          content="Join us and build the next neural search eco system!"
          link="https://www.linkedin.com/company/jinaai/jobs/"
          icon="fab fa-linkedin"
          theme="linkedin"
          dataName="jina-linkedin-card"
        />
      </Grid>
    </Grid>
  </Container>
);

export default NotFound;
