import React from "react";
import { Card, CardHeader, CardBody } from "shards-react";

class Readme extends React.Component {
  render = () => {
    const { readme, documentation } = this.props;
    return (
      <Card className="readme-container mb-4">
        <CardHeader className="border-bottom d-flex flex-row">
          <h6 className="m-0 d-inline-block">README.MD</h6>
          <div className="flex-fill d-inline-block" />
          <a
            href={documentation}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-primary"
          >
            <i className="fab fa-github"></i> View on GitHub
          </a>
        </CardHeader>
        <CardBody>
          {readme ? (
            <div
              className="markup"
              dangerouslySetInnerHTML={{ __html: readme }}
            />
          ) : (
            <h2 className="text-muted text-center py-4">No Readme Found</h2>
          )}
        </CardBody>
      </Card>
    );
  };
}

export default Readme;
