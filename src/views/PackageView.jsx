import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Dispatcher, Constants, Store } from "../flux";
import BuildHistory from "../components/Hub/BuildHistory";
import PageTitle from "../components/Common/PageTitle";
import Details from "../components/Hub/ImageDetails";
import Readme from "../components/Hub/Readme";
import CopyCommand from "../components/Hub/CopyCommand";
import StarRating from "../components/Hub/StarRating";
import ImageReviews from "../components/Hub/ImageReviews";
import { copyToClipboard } from "../helpers";

class PackageView extends React.Component {
  constructor() {
    super();
    let windowHash = window.location.hash;
    const windowParams = windowHash.substring(
      windowHash.indexOf("?"),
      windowHash.length
    );
    const params = new URLSearchParams(windowParams);
    const imageId = params.get("id");
    this.state = {
      imageId,
      loading: false,
      imageData: {
        reviews: [],
        repoTags: [],
      },
    };
    Store.on("update-hub", this.getImageData);
  }

  componentDidMount = () => {
    this.getData();
    this.getImageData();
  };

  componentWillUnmount = () => {
    Store.removeListener("update-hub", this.getImageData);
  };

  getImageData = async () => {
    const imageData = (await Store.getHubImage(this.state.imageId)) || {};
    this.setState({ imageData, loading: false });
  };

  rate = (stars) => {
    const { imageId } = this.state;
    Dispatcher.dispatch({
      actionType: Constants.POST_RATING,
      payload: { imageId, stars },
    });
  };

  copyCode = (content) => {
    copyToClipboard(content);
    Dispatcher.dispatch({
      actionType: Constants.SHOW_BANNER,
      payload: ["Content copied to clipboard", "success"],
    });
  };

  newReview = () => {
    const imageId = this.state.imageData.id;
    const modal = "review";
    Dispatcher.dispatch({
      actionType: Constants.SHOW_MODAL,
      payload: { modal, params: { imageId } },
    });
  };

  render = () => {
    const { imageData, loading } = this.state;
    const {
      name,
      readmeHTML,
      documentation,
      totalStars,
      totalRatings,
      userRated,
      reviews,
    } = imageData;
    let rating;
    if (totalStars && totalRatings) {
      rating = totalStars / totalRatings;
    }
    return (
      <Container fluid className="main-content-container px-0">
        {loading ? (
          <div className="error">
            <div className="loader" />
          </div>
        ) : (
          <div className="px-4">
            <Row noGutters className="page-header py-4">
              <PageTitle
                title={name}
                subtitle="Image"
                className="text-sm-left mb-3"
              />
              <Col md="6" />
              <Col md="3" className="py-sm-2">
                <h3>
                  <StarRating
                    rating={userRated || rating}
                    rate={this.rate}
                    userRated={userRated}
                  />
                </h3>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <CopyCommand image={imageData} copyCode={this.copyCode} />
                <Details image={imageData} />
                <BuildHistory image={imageData} />
              </Col>
              <Col md="6">
                <Readme readme={readmeHTML} documentation={documentation} />
                <ImageReviews reviews={reviews} newReview={this.newReview} />
              </Col>
            </Row>
          </div>
        )}
      </Container>
    );
  };
}

export default PackageView;
