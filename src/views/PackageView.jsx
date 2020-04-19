import React from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Dispatcher, Constants, Store } from '../flux';
import BuildHistory from "../components/Hub/BuildHistory";
import PageTitle from '../components/Common/PageTitle';
import Details from '../components/Hub/ImageDetails';
import Readme from "../components/Hub/Readme";
import CopyCommand from "../components/Hub/CopyCommand";
import StarRating from "../components/Hub/StarRating";
import ImageReviews from '../components/Hub/ImageReviews';

class HubView extends React.Component {

	constructor() {
		super();
		let windowHash = window.location.hash;
		const windowParams = windowHash.substring(windowHash.indexOf('?'), windowHash.length);
		const params = new URLSearchParams(windowParams);
		const imageId = params.get('id');
		this.state = {
			imageId,
			banner: Store.getBanner('hub'),
			imageData: Store.getHubImage(imageId) || {}
		}
	}

	componentWillMount = () => {
		Store.on('update-ui', this.getData);
		Store.on('update-hub', this.getImageData);
	}

	componentWillUnmount = () => {
		Store.removeListener('update-ui', this.getData);
		Store.removeListener('update-hub', this.getImageData);
	}

	getImageData = () => {
		const imageData = Store.getHubImage(this.state.imageId) || {}
		this.setState({ imageData });
	}

	getData = () => {
		const banner = Store.getBanner('hub');
		this.setState({ banner });
	}
	render = () => {
		const { banner, imageData } = this.state;
		return (
			<Container fluid className="main-content-container px-0">
				{
					banner &&
					<div className="mr-4">
						<div className={`mb-0 banner px-4 banner-${banner.theme}`}>
							{banner.message}
						</div>
					</div>

				}
				<div className="px-4">
					<Row noGutters className="page-header py-4">
						<PageTitle title={imageData.name} subtitle="Image" className="text-sm-left mb-3" />
						<Col md="6"/>
						<Col md="3" className="py-sm-2">
							<h3><StarRating rating={4.5}/></h3>
						</Col>
					</Row>
					<Row>
						<Col md="8">
							<Readme readme={imageData.readmeHTML} documentation={imageData.documentation}  />
						</Col>
						<Col md="4">
							<CopyCommand image={imageData}/>
							<Details image={imageData} />
							<BuildHistory image={imageData}/>
							<ImageReviews />
						</Col>
					</Row>

				</div>
			</Container>
		)
	}
}

export default HubView;
