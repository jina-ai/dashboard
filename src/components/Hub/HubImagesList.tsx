import React, { useEffect, useState, useCallback } from "react";
import { Row, Col } from "react-bootstrap";
import { Dispatcher, Constants, Store } from "../../flux";
import { MultiFilterSelect } from "../Common/MultiFilterSelect";
import { ExpandingSearchbar } from "../Common/ExpandingSearchbar";
import ImageCard from "./ImageCard";

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

const HubImagesList = () => {
  const [images, setImages] = useState([]);
  const [sortType, setSortType] = useState("");
  const [category, setCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    Store.on("update-hub", getHubImages);
    // cleanup
    return () => {
      Store.removeListener("update-hub", getHubImages);
    };
  });

  const search = useCallback(() => {
    Dispatcher.dispatch({
      actionType: Constants.SEARCH_HUB,
      payload: { category, q: searchQuery, sort: sortType },
    });
  }, [sortType, category, searchQuery]);

  useEffect(() => {
    search();
  }, [search]);

  const getHubImages = () => {
    const images = Store.getHubImages();
    setImages(images);
  };

  return (
    <>
      <Row className="mb-4">
        <Col md="8">
          <MultiFilterSelect
            options={categoryOptions}
            onFilterChange={(option: any[]) => setCategory(option[0].value)}
            className="hub-select mb-2 mr-0 mb-md-0 mr-md-2"
            placeholder="All Categories"
            isSearchable={false}
          />
          <MultiFilterSelect
            options={sortOptions}
            onFilterChange={(option: any[]) => setSortType(option[0].value)}
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
            onChange={setSearchQuery}
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
    </>
  );
};

export default HubImagesList;
