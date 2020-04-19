import React from "react";
import { Card, CardHeader, CardBody, Badge } from 'shards-react';

class BuildHistory extends React.Component {
	render = () => {
		const { buildHistory } = this.props.image;
		return (
			<Card className="readme-container mb-4">
				<CardHeader className="border-bottom d-flex flex-row">
					<h6 className="m-0 d-inline-block">Build History</h6>
				</CardHeader>
				<CardBody className="p-0 build-history">
					{
						buildHistory && buildHistory.map(build =>{
							const formattedCreated = (new Date(build.created)).toLocaleString();
						return (
							<div className="user-activity__item pr-3 py-3">
								<div className="user-activity__item__icon mt-2">
									<i className="material-icons">build</i>
								</div>
								<div className="user-activity__item__content">
									<span className="text-light">{formattedCreated}</span>
									<p>[{build.os}/{build.architecture}] {parseFloat(build.size/1e6).toFixed(2)} MB</p>
								</div>
							</div>
							)
						})
					}
				</CardBody>
			</Card>
		)
	}
}

export default BuildHistory;
