import React from "react";
import { Card, CardHeader, CardBody, Row, Col } from 'shards-react';

class Readme extends React.Component {
	render = () => {
		const { image } = this.props;
		return (
			<Card className="readme-container mb-4">
				<CardHeader className="border-bottom d-flex flex-row">
					<h6 className="m-0 d-inline-block">Image Details</h6>
				</CardHeader>
				<CardBody className="pt-0 pb-2">
					<Row className="border-bottom py-2">
						<Col>Name</Col>
						<Col>{image.name}</Col>
					</Row>
					<Row className="border-bottom py-2">
						<Col>Version</Col>
						<Col>{image.version}</Col>
					</Row>
					<Row className="border-bottom py-2">
						<Col>Author</Col>
						<Col>{image.author}</Col>
					</Row>
					<Row className="border-bottom py-2">
						<Col>Description</Col>
						<Col>{image.description}</Col>
					</Row>
					<Row className="border-bottom py-2">
						<Col>Documentation</Col>
						<Col><a href={image.documentation} target="_blank">{image.documentation}</a></Col>
					</Row>
					<Row className="border-bottom py-2">
						<Col>Source</Col>
						<Col><a href={image.source} target="_blank">{image.source}</a></Col>
					</Row>
					<Row className="border-bottom py-2">
						<Col>License</Col>
						<Col>{image.license}</Col>
					</Row>
					<Row className="border-bottom py-2">
						<Col>Vendor</Col>
						<Col>{image.vendor}</Col>
					</Row>
					<Row className="py-2">
						<Col>URL</Col>
						<Col><a href={image.url} target="_blank">{image.url}</a></Col>
					</Row>
				</CardBody>
			</Card>
		)
	}
}

export default Readme;