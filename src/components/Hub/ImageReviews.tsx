import React from "react";
import { Button } from "shards-react";
import ReviewCard from "./ReviewCard";
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
      {reviews.length > 0 ? (
        reviews.map((review, idx) => <ReviewCard key={idx} review={review} />)
      ) : (
        <h2 className="text-muted text-center py-4">No Reviews</h2>
      )}
    </div>
  );
}
