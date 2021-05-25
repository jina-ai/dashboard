import React, { useEffect, useState, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
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
import { FilterCategory, FilterParams } from "../../redux/hub/hub.types"
import styled from "@emotion/styled"
import { Grid } from "@material-ui/core"

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
  let [filters, setFilters] = useState([] as FilterCategory[])
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
        <Grid container>
          <Grid item xs={12}>
            Hub/Library
          </Grid>

          <Grid item xs={3}>
            <HubFilters
              filters={filters}
              setFilters={setFilters}
              getHubImages={getHubImages}
            />
          </Grid>
          <Grid direction="row-reverse" container item xs={9}>
            <Grid item>
              <ExpandingSearchbar
                placeholder="search hub images..."
                value={searchString}
                onChange={setSearchString}
                onSearch={onSearch}
              />
            </Grid>
            {hubImages.length ? (
              <Grid item container data-name="hubImagesList">
                {hubImages.map((image, index) => (
                  <Grid
                    item
                    key={`${image.name}.${image.version}.${image["jina-version"]}`}
                    xs={4}
                  >
                    <ImageCard image={image} index={index} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <EmptyResultMessage>
                No images matching your search were found
              </EmptyResultMessage>
            )}
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default HubImagesList
