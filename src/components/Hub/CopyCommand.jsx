import React from "react";
import { Card, CardHeader, CardBody,Row,Col,Button } from 'shards-react';
import {copyToClipboard} from '../../helpers';
import {Dispatcher, Constants} from '../../flux';

class CopyCommand extends React.Component {
	copy = () =>{
		const {image} = this.props;
		let content= '';
		image.repoTags.map(tag=>{
			content = content.concat(tag);
		})
		copyToClipboard(content)
		Dispatcher.dispatch({
			actionType: Constants.SHOW_BANNER,
			payload:['hub','Command copied to clipboard','success']
		})
	}
	render = () => {
		const { image } = this.props;
		return (
			<Card className="mb-4">
				<CardHeader className="border-bottom d-flex flex-row">
					<h6 className="m-0 d-inline-block">Docker Installation</h6>
				</CardHeader>
				<CardBody className="installation-command py-2">
					<Row>
						<Col md="9" className="py-2">
						{
							image.repoTags &&
							image.repoTags.map(
								(tag,idx) =>
									<p key={idx}>{tag}</p>
							)
						}</Col>
						<Col md="3" className="py-2">
							<Button theme="light" className="w-100 h-100" onClick={this.copy}><i className="material-icons">file_copy</i> Copy</Button>
							</Col>
					</Row>

				</CardBody>
			</Card>
		)
	}
}

export default CopyCommand;
