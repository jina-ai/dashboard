import React from "react";
import { Row, Col, Collapse, Form, InputGroup, Button, Carousel, Card } from "react-bootstrap"
import { copyToClipboard } from "../../helpers";
import { Dispatcher, Constants } from "../../flux";

class StarRating extends React.Component {
	state = {
		isOpen: false,
		newUser: ''
	}

	getStars = (amount) => {
		let stars = [];
		let integer = parseInt(amount);
		let remainder = amount - integer;
		for (let i = 0; i < integer; ++i) {
			stars.push(<i className="material-icons">star</i>);
		}
		if (remainder>=.8){
			stars.push(<i className="material-icons">star</i>);
		}
		else if(remainder>=.25){
			stars.push(<i className="material-icons">star_half</i>);
		}

		for(let i=stars.length;i<5;++i){
			stars.push(<i className="material-icons">star_outline</i>);
		}
			return stars;
	}

	render = () => {
		const { rating } = this.props;
		const formatted = Math.round(rating*10 ||0)/10;
		const stars = this.getStars(formatted);
		return (
			<span className="app-rating text-muted">
				<span className="rating-num">{formatted}</span>{stars}
			</span>
		)
	}
}

export default StarRating;
