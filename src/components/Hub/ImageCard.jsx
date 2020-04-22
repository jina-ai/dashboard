import React from "react";
import { Row, Col, Collapse, Form, InputGroup, Button, Carousel, Card } from "react-bootstrap"
import { Link } from "react-router-dom";
import StarRating from './StarRating';
import { Dispatcher, Constants } from "../../flux";

class ImageCard extends React.Component {
	state = {
		isOpen: false,
		newUser: ''
	}

	render = () => {
		const { image } = this.props;
		let { name, official, author, description, totalStars, totalRatings, numReviews } = image;
		let rating;
		if (image.totalStars && image.totalRatings) {
			rating = totalStars / totalRatings
		}
		return (
			<Link className="unstyled-link" to={`/package?id=${image.id}`}>
				<Card className="clickable mb-4 h-100">
					<Card.Body className="pb-0 mb-0 pt-3">
						<Row>
							<Col xs="12" className="px-0">
								<div className="app-title">
									{image.name}
									{image.official && <span title="Official Package" className="float-right"><i className="ml-2 material-icons verified-icon">verified_user</i></span>}
								</div>
								<div className="app-subtitle">{image.author}</div>
							</Col>
							<Col sm="12" className="px-0 pt-3 pb-0">
								<div className="description-container">
									<div className="description-overlay" />
									<div className="app-description">{image.description}</div>
								</div>
							</Col>
						</Row>
					</Card.Body>
					<Card.Footer className="pt-0 px-3 pb-3">
						{
							this.getNumReviews(numReviews)
						}
						{
							rating &&
							<StarRating rating={rating} />
						}
					</Card.Footer>
				</Card>
			</Link>
		)
	}

	getNumReviews(reviews) {
		if (!reviews)
			return <span className="text-muted">no reviews</span>

		if (reviews > 1)
			return <span>{reviews} reviews</span>

		return <span>{reviews} review</span>
	}
}

export default ImageCard;
