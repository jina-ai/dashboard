import React from "react";

type RatingFunction = (stars: number) => void;
type StarRatingProps = {
  rating: any;
  totalRatings:number;
  userRated?: boolean;
  rate?: RatingFunction;
};

const StarRating = ({ rating, userRated, rate,totalRatings }: StarRatingProps) => {
  const stars = getStars(rating, rate);
  return (
    <div
      className={`d-inline-block app-rating mb-3 ${rating ? "existing" : ""} ${
        userRated ? "userRated" : ""
      } text-muted`}
    >
      <span className="text-faded">{userRated ? "You Rated: " : ""}</span>
      {stars}
      {
        totalRatings&&<span className="rating-num ml-1">({totalRatings})</span>
      }
    </div>
  );
};

export const getStars = (
  amount: number,
  rate: RatingFunction | undefined
): JSX.Element[] => {
  const handleRatingClick = (index: number) => rate && rate(index);
  let stars = [];
  let integer = Math.floor(amount);
  let remainder = amount - integer;
  let i;
  for (i = 0; i < integer; ++i) {
    let index = i;
    stars.push(
      <i
        key={i}
        className="material-icons"
        onClick={() => handleRatingClick(index)}
      >
        star
      </i>
    );
  }
  if (remainder >= 0.8) {
    let index = i;
    stars.push(
      <i
        key={i++}
        className="material-icons"
        onClick={() => handleRatingClick(index)}
      >
        star
      </i>
    );
  } else if (remainder >= 0.25) {
    let index = i;
    stars.push(
      <i
        key={i++}
        className="material-icons"
        onClick={() => handleRatingClick(index)}
      >
        star_half
      </i>
    );
  }
  for (let j = stars.length; j < 5; ++j) {
    let index = i;
    stars.push(
      <i
        key={i++}
        className="material-icons"
        onClick={() => handleRatingClick(index)}
      >
        star_outline
      </i>
    );
  }
  return stars;
};

export default StarRating;
