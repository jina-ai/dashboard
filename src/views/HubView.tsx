import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Dispatcher, Constants, Store } from "../flux";
import { PageTitle } from "../components/Common/PageTitle";
import { MultiFilterSelect } from "../components/Common/MultiFilterSelect";
import { ExpandingSearchbar } from "../components/Common/ExpandingSearchbar";
import ImageCard from "../components/Hub/ImageCard";

const categoryOptions = [
  { value: "all", label: "All Categories" },
  { value: "search", label: "Search" },
  { value: "configurations", label: "Configurations" },
];

const sortOptions = [
  { value: "suggested", label: "Suggested" },
  { value: "highestRating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
];

class HubView extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      images: Store.getHubImages(),
      sortType: "suggested",
      category: "all",
      searchQuery: "",
    };

    Store.on("update-hub", this.getHubImages);
  }

  componentWillUnmount = () => {
    Store.removeListener("update-hub", this.getHubImages);
  };

  getHubImages = () => {
    const images = Store.getHubImages();
    this.setState({ images });
  };

  sortBy = (sortType: string) => {
    this.setState({ sortType }, this.search);
  };

  setCategory = (category: string) => {
    this.setState({ category }, this.search);
  };

  updateSearch = (searchQuery: string) => {
    this.setState({ searchQuery }, this.search);
  };

  search = () => {
    const { category, searchQuery, sortType } = this.state;
    Dispatcher.dispatch({
      actionType: Constants.SEARCH_HUB,
      payload: { category, q: searchQuery, sort: sortType },
    });
  };

  render = () => {
    const { images, searchQuery } = this.state;
    return (
      <Container fluid className="main-content-container px-0">
        <div className="px-4">
          <Row className="page-header">
            <PageTitle title="Jina Hub" className="text-sm-left mb-3" />
          </Row>
          <Row className="mb-4">
            <Col md="8">
              <MultiFilterSelect
                options={categoryOptions}
                onFilterChange={(option: any[]) =>
                  this.setCategory(option[0].value)
                }
                className="hub-select mb-2 mr-0 mb-md-0 mr-md-2"
                placeholder="All Categories"
                isSearchable={false}
              />
              <MultiFilterSelect
                options={sortOptions}
                onFilterChange={(option: any[]) => this.sortBy(option[0].value)}
                className="hub-select mb-2 mr-0 mb-md-0 mr-md-2"
                placeholder="Suggested"
                isSearchable={false}
              />
            </Col>
            <Col md="4">
              <ExpandingSearchbar
                variant="gray"
                placeholder="search hub..."
                value={searchQuery}
                onChange={this.updateSearch}
              />
            </Col>
          </Row>
          <Row>
            {Object.keys(images).map((imageId) => (
              <Col key={imageId} md="3" className="mb-4">
                <ImageCard image={(images as any)[imageId]} />
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    );
  };
}

export default HubView;
