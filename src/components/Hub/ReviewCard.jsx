import React from "react";
import { Card, CardHeader, CardBody } from 'shards-react';
import StarRating from "./StarRating";

class ReviewCard extends React.Component {
	render = () => {
		return (
			<Card className="readme-container mb-4">
				<CardHeader className="border-bottom d-flex flex-row">
					<h6 className="m-0 d-inline-block">Mr.Github</h6>
					<div className="flex-fill d-inline-block" />
					<h6 className="m-0"><StarRating rating={4.5}/></h6>
				</CardHeader>
				<CardBody className="py-3">
					This is a great image, I used this to create the most incredible search function you've ever seen in your life.
				</CardBody>
			</Card>
		)
	}
}

export default ReviewCard;
