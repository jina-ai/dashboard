import React from "react";
import { Card, CardHeader, CardBody } from "shards-react";

export default ({ review }) => {
  return (
    <Card className="readme-container mb-4">
      <CardHeader className="border-bottom d-flex flex-row">
        <h6 className="m-0 d-inline-block">{review.username}</h6>
        <div className="flex-fill d-inline-block" />
      </CardHeader>
      <CardBody className="py-3">{review.content}</CardBody>
    </Card>
  );
};
