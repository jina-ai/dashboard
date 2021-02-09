import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import BuildHistory from "../components/Hub/BuildHistory";
import { PageTitle } from "../components/Common/PageTitle";
import Details from "../components/Hub/ImageDetails";
import Readme from "../components/Hub/Readme";
import CopyCommand from "../components/Hub/CopyCommand";
import ImageReviews from "../components/Hub/ImageReviews";
import { copyToClipboard } from "../helpers";

class PackageView extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
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
  }

  componentDidMount = () => {
    this.getImageData();
  };

  componentWillUnmount = () => {};

  getImageData = async () => {};

  copyCode = (content: any) => {
    copyToClipboard(content);
  };

  newReview = () => {};

  render = () => {
    const { imageData, loading } = this.state;
    const { name, readmeHTML, documentation, reviews } = imageData;
    return (
      <Container fluid className="main-content-container px-0">
        {loading ? (
          <div className="error">
            <div className="loader" />
          </div>
        ) : (
          <div className="px-4">
            <Row noGutters className="page-header mb-4">
              <PageTitle title={name} className="text-sm-left mb-3" />
              <Col md="6" />
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
