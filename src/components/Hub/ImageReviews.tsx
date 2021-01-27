import React from "react";
import { Button } from "shards-react";
import { Review } from "./types";

type Props = {
  reviews: Review[];
  newReview: () => void;
};

export default function ImageReviews({ reviews, newReview }: Props) {
  return (
    <div>
      <div className="border-bottom d-flex flex-row mb-4">
        <h3 className="flex-fill">Reviews</h3>
        <div>
          <Button onClick={newReview}>
            <i className="material-icons mr-2">add_comment</i>New Review
          </Button>
        </div>
      </div>
    </div>
  );
}
