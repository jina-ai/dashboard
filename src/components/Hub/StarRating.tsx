import React from "react";

type RatingFunction = (stars: number) => void;
type StarRatingProps = {
  rating: any;
  userRated?: boolean;
  rate?: RatingFunction;
};

const StarRating = ({ rating, userRated, rate }: StarRatingProps) => {
  //@ts-ignore
  const formatted = parseFloat(Math.round(rating * 10 || 0) / 10).toFixed(1);
  const stars = getStars(rating, rate);
  return (
    <span
      className={`app-rating ${rating ? "existing" : ""} ${
        userRated ? "userRated" : ""
      } text-muted`}
    >
      <span className="text-faded">{userRated ? "You Rated: " : ""}</span>
      <span className="rating-num">{rating ? formatted : ""}</span>
      {stars}
    </span>
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
