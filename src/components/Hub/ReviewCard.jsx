import React from "react";
import { Card, CardHeader, CardBody } from 'shards-react';
import StarRating from "./StarRating";

class ReviewCard extends React.Component {
	render = () => {
		const {review} = this.props;
		return (
			<Card className="readme-container mb-4">
				<CardHeader className="border-bottom d-flex flex-row">
					<h6 className="m-0 d-inline-block">{review.username}</h6>
					<div className="flex-fill d-inline-block" />
					{/* <h6 className="m-0"><StarRating rating={4.5}/></h6> */}
				</CardHeader>
				<CardBody className="py-3">
					{review.content}
				</CardBody>
			</Card>
		)
	}
}

export default ReviewCard;
