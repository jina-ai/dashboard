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
import {
  FilterCategory,
  FilterParams,
  HubImage,
} from "../../redux/hub/hub.types"
import styled from "@emotion/styled"
import {
  Grid,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@material-ui/core"

const sortOptions = [
  "none",
  "name increasing",
  "name decreasing",
  "author increasing",
  "author decreasing",
]

const sortHubImages = (images: HubImage[], sortOption: number) => {
  switch (sortOptions[sortOption]) {
    case "none":
      return images
    case "name increasing":
      return images.sort((imageA, imageB) =>
        imageA.name < imageB.name ? -1 : imageA.name > imageB.name ? 1 : 0
      )
    case "name decreasing":
      return images.sort((imageA, imageB) =>
        imageA.name > imageB.name ? -1 : imageA.name < imageB.name ? 1 : 0
      )
    case "author increasing":
      return images.sort((imageA, imageB) =>
        imageA.author < imageB.author
          ? -1
          : imageA.author > imageB.author
          ? 1
          : 0
      )
    case "author decreasing":
      return images.sort((imageA, imageB) =>
        imageA.author > imageB.v ? -1 : imageA.author < imageB.author ? 1 : 0
      )
  }
}

const EmptyResultMessage = styled.h3`
  margin-top: 25px;
  text-align: center;
`

const HubImagesList = () => {
  const dispatch = useDispatch()
  const imageFilters = useSelector(selectHubFilters)
  const isHubImagesLoading = useSelector(selectIsHubImagesLoading)
  const hubImagesFetchError = useSelector(selectHubImagesFetchError)
  const [filters, setFilters] = useState([] as FilterCategory[])
  const [searchString, setSearchString] = useState("")
  const [sortOption, setSortOption] = useState(0)
  const hubImages = sortHubImages(useSelector(selectHubImages), sortOption)

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

  const handleSortOption = (event: React.ChangeEvent<{ value: number }>) => {
    setSortOption(event.target.value)
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
          <Grid container item xs={9}>
            <Grid item container xs={12}>
              <Grid item xs={10}>
                <FormControl>
                  <InputLabel
                    shrink
                    id="demo-simple-select-placeholder-label-label"
                  >
                    Sort
                  </InputLabel>
                  <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={sortOption}
                    onChange={handleSortOption}
                  >
                    {sortOptions.map((sortOption, idx) => (
                      <MenuItem value={idx}>{sortOptions[idx]}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <ExpandingSearchbar
                  placeholder="search hub images..."
                  value={searchString}
                  onChange={setSearchString}
                  onSearch={onSearch}
                />
              </Grid>
            </Grid>

            {hubImages.length ? (
              <Grid spacing={2} item container data-name="hubImagesList">
                {hubImages.map((image, index) => (
                  <Grid
                    item
                    key={`${image.name}.${image.version}.${image["jina-version"]}`}
                    xs={6}
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
