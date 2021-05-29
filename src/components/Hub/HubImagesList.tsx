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
import { Grid } from "@material-ui/core"
import HubSortDropdown from "./HubSortDropdown"
import { sortOptions } from "../../redux/hub/hub.constants"

const sortHubImages = (images: HubImage[], selectedSortOption: string) => {
  switch (selectedSortOption) {
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
        imageA.author > imageB.author
          ? -1
          : imageA.author < imageB.author
          ? 1
          : 0
      )
  }
}

const HubLibraryContainer: React.FC = ({ children }) => {
  const HubLibraryContainerStyled = styled(Grid)`
    background-color: ${(props) => props.theme.palette.background.default};
    border: 1px solid ${(props) => props.theme.palette.grey[300]};
  `
  return (
    <HubLibraryContainerStyled container>{children}</HubLibraryContainerStyled>
  )
}

const HubLibraryHeader: React.FC = () => {
  const HubLibraryHeaderStyled = styled(Grid)`
    padding: 16px;
    border-bottom: 1px solid ${(props) => props.theme.palette.grey[300]};
  `
  return (
    <HubLibraryHeaderStyled item xs={12}>
      <h3 style={{ margin: 0 }}>
        Hub / <span style={{ fontWeight: 700 }}>Library</span>
      </h3>
    </HubLibraryHeaderStyled>
  )
}

const FilterContainer: React.FC = ({ children }) => {
  const FilterContainerStyled = styled(Grid)`
    padding: 24px 16px;
    border-right: 1px solid ${(props) => props.theme.palette.grey[300]};
  `
  return (
    <FilterContainerStyled container item xs={3}>
      {children}
    </FilterContainerStyled>
  )
}

const ImagesContainer: React.FC = ({ children }) => {
  const ImagesContainerStyled = styled(Grid)`
    padding: 24px 16px;
  `
  return (
    <ImagesContainerStyled container item xs={9}>
      {children}
    </ImagesContainerStyled>
  )
}
const ImagesBar: React.FC = ({ children }) => {
  const ImagesBarStyled = styled(Grid)`
    margin-bottom: 24px;
  `
  return (
    <ImagesBarStyled container item xs={12}>
      {children}
    </ImagesBarStyled>
  )
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
  const [selectedSortOption, setSelectedSortOption] = useState(sortOptions[0])
  const hubImagesUnsorted = useSelector(selectHubImages)
  const hubImages = sortHubImages(hubImagesUnsorted, selectedSortOption)

  if (hubImages?.length === 0 && !isHubImagesLoading && !hubImagesFetchError) {
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

  const handleSortOption = (event: React.ChangeEvent<{ value: string }>) => {
    setSelectedSortOption(event.target.value)
  }

  return (
    <>
      {isHubImagesLoading ? (
        <SpinningLoader />
      ) : (
        <HubLibraryContainer>
          <HubLibraryHeader>Hub/Library</HubLibraryHeader>
          <FilterContainer>
            <HubFilters
              filters={filters}
              setFilters={setFilters}
              getHubImages={getHubImages}
            />
          </FilterContainer>
          <ImagesContainer>
            <ImagesBar>
              <Grid item xs={9}>
                <HubSortDropdown
                  selectedSortOption={selectedSortOption}
                  sortOptions={sortOptions}
                  handleSortOption={handleSortOption}
                />
              </Grid>
              <Grid item xs={3}>
                <ExpandingSearchbar
                  value={searchString}
                  onChange={setSearchString}
                  onSearch={onSearch}
                />
              </Grid>
            </ImagesBar>

            {hubImages?.length ? (
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
          </ImagesContainer>
        </HubLibraryContainer>
      )}
    </>
  )
}

export default HubImagesList
