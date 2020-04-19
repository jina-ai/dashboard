import React from "react";
import { Container, Row, Col, Form, Button, FormControl } from 'react-bootstrap';
import { Alert, FormInput, InputGroup, InputGroupAddon, InputGroupText, FormSelect } from 'shards-react'
import { Dispatcher, Constants, Store } from '../flux';
import PageTitle from '../components/Common/PageTitle';
import ImageCard from "../components/Hub/ImageCard";

class HubView extends React.Component {
	state = {
		banner: Store.getBanner('hub'),
		images: Store.getHubImages(),
		sortType: 'suggested',
		category: 'all'
	}
	componentWillMount = () => {
		Store.on('update-ui', this.getData);
		Store.on('update-hub', this.getHubImages);
	}

	componentWillUnmount = () => {
		Store.removeListener('update-ui', this.getData);
		Store.removeListener('update-hub', this.getHubImages);
	}

	getHubImages = () => {
		const images = Store.getHubImages();
		this.setState({ images });
	}

	getData = () => {
		const banner = Store.getBanner('hub');
		this.setState({ banner });
	}

	sortBy = (sortType) => {
		this.setState({ sortType });
	}

	setCategory = (category) => {
		this.setState({ category });
	}

	render = () => {
		const { banner, images, sortType,category } = this.state;
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
					<Row className="page-header py-4">
						<PageTitle title="Jina Hub" subtitle="Community" className="text-sm-left mb-3" />
						<Col md="3" className="py-sm-2">
							<InputGroup>
								<InputGroupAddon type="prepend">
									<InputGroupText>Categories</InputGroupText>
								</InputGroupAddon>
								<FormSelect onChange={(e) => this.setCategory(e.target.value)} value={category}>
									<option value="all">All Categories</option>
									<option value="highestRated">Search</option>
									<option value="newest">Configurations</option>
								</FormSelect>
							</InputGroup>
						</Col>

						<Col md="3" className="py-sm-2">
							<InputGroup>
								<InputGroupAddon type="prepend">
									<InputGroupText>Sort By</InputGroupText>
								</InputGroupAddon>
								<FormSelect onChange={(e) => this.sortBy(e.target.value)} value={sortType}>
									<option value="suggested">Suggested</option>
									<option value="highestRated">Highest Rated</option>
									<option value="newest">Newest</option>
								</FormSelect>
							</InputGroup>
						</Col>

						<Col md="3" className="py-sm-2">
							<FormInput placeholder="search images..." className="mb-3 mb-sm-0 ml-auto py-2" />
						</Col>
					</Row>
					<Row>
						{
							Object.keys(images).map(imageId =>
								<Col key={imageId} md="3" className="mb-4">
									<ImageCard image={images[imageId]} />
								</Col>
							)
						}
					</Row>

				</div>
			</Container >
		)
	}
}

export default HubView;
