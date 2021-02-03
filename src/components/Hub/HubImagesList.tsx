import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { fetchHubImages } from "../../redux/hub/hub.actions";
import {
  selectHubImages,
  selectIsHubImagesLoading,
} from "../../redux/hub/hub.selectors";
import { HubImage } from "../../redux/hub/hub.types";
import ImageCard from "./ImageCard";
import HubFilters from "./HubFilters";
import SpinningLoader from "../Common/SpinningLoader";
import { Filter, FilterMap } from "./HubFilters";

export const removeDuplicates = (arrayWithDuplicates: string[]): string[] =>
  arrayWithDuplicates.filter((e, i) => {
    return arrayWithDuplicates.indexOf(e) === i;
  });

export const convertArrayToFilterObject = (array: string[]): FilterMap =>
  array.reduce((acc, f) => ({ ...acc, [f]: false }), {} as FilterMap);

export const getImageFilters = (images: HubImage[]) => {
  return [
    {
      filterLabel: "Type of image",
      values: convertArrayToFilterObject(
        removeDuplicates(
          images.reduce((acc, image) => [...acc, image.kind], [] as string[])
        )
      ),
    },
    {
      filterLabel: "Key domain of the image",
      values: convertArrayToFilterObject(
        removeDuplicates(
          images.reduce(
            (acc, image) => [...acc, ...image.keywords],
            [] as string[]
          )
        )
      ),
    },
  ];
};

const HubImagesList = () => {
  const dispatch = useDispatch();
  const hubImages = useSelector(selectHubImages);
  const isHubImagesLoading = useSelector(selectIsHubImagesLoading);
  let [filters, setFilters] = useState([] as Filter[]);

  useEffect(() => {
    hubImages && setFilters(getImageFilters(hubImages));
  }, [hubImages]);

  useEffect(() => {
    dispatch(fetchHubImages());
  }, [dispatch]);

  const getHubImages = useCallback(
    (filters) => {
      dispatch(fetchHubImages(filters));
    },
    [dispatch]
  );

  return (
    <>
      {isHubImagesLoading ? (
        <SpinningLoader />
      ) : (
        <Row>
          <Col md="2">
            <HubFilters
              filters={filters}
              setFilters={setFilters}
              getHubImages={getHubImages}
            />
          </Col>
          <Col md="10">
            <Row data-name="hubImagesList">
              {hubImages.map((image) => (
                <Col
                  key={`${image.name}.${image.version}.${image["jina-version"]}`}
                  md="4"
                  className="mb-4"
                >
                  <ImageCard image={image} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      )}
    </>
  );
};

export default HubImagesList;
