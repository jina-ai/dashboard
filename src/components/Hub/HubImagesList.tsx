import React, { useEffect, useState, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Row, Col } from "react-bootstrap"
import { fetchHubImages } from "../../redux/hub/hub.actions"
import {
  selectHubFilters,
  selectHubImages,
  selectHubImagesFetchError,
  selectIsHubImagesLoading,
} from "../../redux/hub/hub.selectors"
import ImageCard from "./ImageCard"
import HubFilters, { getSelectedFilters } from "./HubFilters"
import SpinningLoader from "../Common/SpinningLoader"
import { ExpandingSearchbar } from "../Common/ExpandingSearchbar"
import { Filter,  FilterParams } from "../../redux/hub/hub.types"
import styled from "@emotion/styled"

const SearchContainer = styled(Row)`
  flex-direction: row-reverse;
  padding: 1rem;
`

const EmptyResultMessage = styled.h3`
  margin-top: 25px;
  text-align: center;
`

const HubImagesList = () => {
  const dispatch = useDispatch()
  const hubImages = useSelector(selectHubImages)
  const imageFilters = useSelector(selectHubFilters)
  const isHubImagesLoading = useSelector(selectIsHubImagesLoading)
  const hubImagesFetchError = useSelector(selectHubImagesFetchError)
  let [filters, setFilters] = useState([] as Filter[])
  let [searchString, setSearchString] = useState("")
  if (hubImages.length === 0 && !isHubImagesLoading && !hubImagesFetchError) {
    dispatch(fetchHubImages())
  }

  useEffect(() => {
    hubImages && setFilters(imageFilters)
  }, [hubImages]) // eslint-disable-line react-hooks/exhaustive-deps

  const getHubImages = useCallback(
    (filters: FilterParams, searchQuery = searchString) => {
      dispatch(fetchHubImages({ ...filters, name: searchQuery }))
    },
    [dispatch, searchString]
  )

  const onSearch = (searchQuery: string | number) => {
    getHubImages(getSelectedFilters(filters), searchQuery)
  }

  return (
    <>
      {isHubImagesLoading ? (
        <SpinningLoader />
      ) : (
        <Row>
          <Col md="3">
            <HubFilters
              filters={filters}
              setFilters={setFilters}
              getHubImages={getHubImages}
            />
          </Col>
          <Col md="9">
            <SearchContainer>
              <ExpandingSearchbar
                placeholder="search hub images..."
                value={searchString}
                onChange={setSearchString}
                onSearch={onSearch}
              />
            </SearchContainer>
            {hubImages.length ? (
              <Row data-name="hubImagesList">
                {hubImages.map((image, index) => (
                  <Col
                    key={`${image.name}.${image.version}.${image["jina-version"]}`}
                    md="4"
                    className="mb-4"
                  >
                    <ImageCard image={image} index={index} />
                  </Col>
                ))}
              </Row>
            ) : (
              <EmptyResultMessage>
                No images matching your search were found
              </EmptyResultMessage>
            )}
          </Col>
        </Row>
      )}
    </>
  )
}

export default HubImagesList
