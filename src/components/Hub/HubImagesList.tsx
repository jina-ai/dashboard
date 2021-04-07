import React, { useEffect, useState, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Row, Col } from "react-bootstrap"
import { fetchHubImages } from "../../redux/hub/hub.actions"
import {
  selectHubImages,
  selectHubImagesFetchError,
  selectIsHubImagesLoading,
} from "../../redux/hub/hub.selectors"
import { HubImage } from "../../redux/hub/hub.types"
import ImageCard from "./ImageCard"
import HubFilters, { FilterParams, getSelectedFilters } from "./HubFilters"
import SpinningLoader from "../Common/SpinningLoader"
import { ExpandingSearchbar } from "../Common/ExpandingSearchbar"
import { Filter, FilterMap } from "./HubFilters"
import styled from "@emotion/styled"

export const removeDuplicates = (arrayWithDuplicates: string[]): string[] =>
  arrayWithDuplicates.filter((e, i) => {
    return arrayWithDuplicates.indexOf(e) === i
  })

export const convertArrayToFilterObject = (
  array: string[],
  filter: Filter
): FilterMap =>
  array.reduce(
    (acc, f) => ({
      ...acc,
      [f]:
        (filter?.values && filter.values[f]) ||
        (!filter?.values && array.length === 1),
    }),
    {} as FilterMap
  )

const SearchContainer = styled(Row)`
  flex-direction: row-reverse;
  padding: 1rem;
`

const EmptyResultMessage = styled.h3`
  margin-top: 25px;
  text-align: center;
`

export const getImageFilters = (images: HubImage[], filters: Filter[]) => {
  return [
    {
      filterLabel: "Type of image",
      values: convertArrayToFilterObject(
        removeDuplicates(
          images.reduce((acc, image) => [...acc, image.kind], [] as string[])
        ),
        filters[0]
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
        ),
        filters[1]
      ),
    },
  ]
}

const HubImagesList = () => {
  const dispatch = useDispatch()
  const hubImages = useSelector(selectHubImages)
  const isHubImagesLoading = useSelector(selectIsHubImagesLoading)
  const hubImagesFetchError = useSelector(selectHubImagesFetchError)
  let [filters, setFilters] = useState([] as Filter[])
  let [searchString, setSearchString] = useState("")
  if (hubImages.length === 0 && !isHubImagesLoading && !hubImagesFetchError) {
    dispatch(fetchHubImages())
  }

  useEffect(() => {
    hubImages && setFilters(getImageFilters(hubImages, filters))
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
          <Col md="2">
            <HubFilters
              filters={filters}
              setFilters={setFilters}
              getHubImages={getHubImages}
            />
          </Col>
          <Col md="10">
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
