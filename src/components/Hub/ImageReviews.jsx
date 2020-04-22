import React from "react";
import { Card, CardHeader, CardBody, Button } from 'shards-react';
import ReviewCard from "./ReviewCard";
import { Dispatcher, Constants } from "../../flux";

class Readme extends React.Component {
	newReview = () =>{
		const {imageId} = this.props;
		const modal = 'review';
		Dispatcher.dispatch({
			actionType: Constants.SHOW_MODAL,
			payload: {modal,params:{imageId}}
		})
	}
	render = () => {
		const { reviews } = this.props;
		return (
			<div>
				<div className="border-bottom d-flex flex-row mb-4">
					<h3 className="flex-fill">Reviews</h3>
					<div>
						<Button onClick={this.newReview}><i className="material-icons mr-2">add_comment</i>New Review</Button>
					</div>
				</div>
				{
					reviews.map((review,idx) => 
						<ReviewCard key={idx} review={review}/>
					)
				}
			</div>

		)
	}
}

export default Readme;
