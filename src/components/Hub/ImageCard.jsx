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
		return (
			<Link className="unstyled-link" to={`/package?id=${image.id}`}>
				<Card className="clickable mb-4 h-100">
					<Card.Body className="pb-0 mb-0 pt-3">
						<Row>
							<Col xs="12" className="px-0">
								<div className="app-title">
									{image.name}
									{image.official&&<span title="Official Package" className="float-right"><i className="ml-2 material-icons verified-icon">verified_user</i></span>}
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
					{/* <Card.Footer className="pt-0 px-4 pb-3">
						<span className="app-price">{pricingDescription}</span>
						<StarRating rating={rating || 3.85} />
					</Card.Footer> */}
				</Card>
			</Link>
		)
	}
}

export default ImageCard;
