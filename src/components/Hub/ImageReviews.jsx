import React from "react";
import { Card, CardHeader, CardBody } from 'shards-react';
import ReviewCard from "./ReviewCard";

class Readme extends React.Component {
	render = () => {
		const { readme, documentation } = this.props;
		return (
			<div>
				<h3 className="border-bottom">Reviews</h3>
				<ReviewCard />
				<ReviewCard />
				<ReviewCard />
				<ReviewCard />
				<ReviewCard />
			</div>

		)
	}
}

export default Readme;
