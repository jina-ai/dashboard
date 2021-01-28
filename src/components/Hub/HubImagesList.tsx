import React, { useEffect, useState, useCallback } from "react";
import {useSelector, useDispatch} from "react-redux"
import { Row, Col } from "react-bootstrap";
import {fetchHubImages} from "../../redux/hub/hub.actions"
import { selectHubImages } from "../../redux/hub/hub.selectors"
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
  const dispatch = useDispatch()
  const hubImages = useSelector(selectHubImages)

  const search = useCallback(() => {
    dispatch(fetchHubImages())
  }, [dispatch]);

  useEffect(() => {
    search();
  }, [search]);

  return (
    <>
      <Row>
        {hubImages.map((image) => (
          <Col key={`${image.name}.${image.version}.${image["jina-version"]}`} md="3" className="mb-4">
            <ImageCard image={image} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HubImagesList;
