import React from "react";
import { Card, CardHeader, CardBody } from "shards-react";
import { Review } from "./types";

type Props = {
  review: Review;
};

export default function ReviewCard({ review }: Props) {
  return (
    <Card className="readme-container mb-4">
      <CardHeader className="border-bottom d-flex flex-row">
        <h6 className="m-0 d-inline-block">{review.username}</h6>
        <div className="flex-fill d-inline-block" />
      </CardHeader>
      <CardBody className="py-3">{review.content}</CardBody>
    </Card>
  );
}
