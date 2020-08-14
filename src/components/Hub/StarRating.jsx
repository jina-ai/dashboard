import React from "react";
import {
  Row,
  Col,
  Collapse,
  Form,
  InputGroup,
  Button,
  Carousel,
  Card,
} from "react-bootstrap";
import { copyToClipboard } from "../../helpers";
import { Dispatcher, Constants } from "../../flux";

class StarRating extends React.Component {
  state = {
    isOpen: false,
    newUser: "",
  };

  getStars = (amount) => {
    let stars = [];
    let integer = parseInt(amount);
    let remainder = amount - integer;
    let i;
    for (i = 0; i < integer; ++i) {
      let index = i;
      stars.push(
        <i key={i} className="material-icons" onClick={() => this.rate(index)}>
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
          onClick={() => this.rate(index)}
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
          onClick={() => this.rate(index)}
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
          onClick={() => this.rate(index)}
        >
          star_outline
        </i>
      );
    }
    return stars;
  };

  rate = (index) => {
    if (this.props.rate) this.props.rate(index + 1);
  };

  render = () => {
    const { rating, userRated } = this.props;
    const formatted = parseFloat(Math.round(rating * 10 || 0) / 10).toFixed(1);
    const stars = this.getStars(formatted);
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
}

export default StarRating;
