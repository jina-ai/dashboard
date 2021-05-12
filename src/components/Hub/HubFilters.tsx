import React from "react"
import styled from "@emotion/styled"
import Button from "@material-ui/core/Button"
import {  useDispatch } from "react-redux"
import FilterButton from "./FilterButton"
import { Filter, FilterParams} from "../../redux/hub/hub.types"
import { selectFilter, clearFilters } from "../../redux/hub/hub.actions"

type HubFilterProps = {
  filters: Filter[]
  setFilters: (filters: Filter[]) => void
  getHubImages: (filters: FilterParams) => void
}

export const getSelectedFilters = (filters: Filter[]): FilterParams => {
  return {
    kind: getCheckedFilterValues(filters[0]),
    keywords: [...getCheckedFilterValues(filters[1]), ...getCheckedFilterValues(filters[2]), ...getCheckedFilterValues(filters[3]),],
  }
}

export const getCheckedFilterValues = (filter: Filter) => {
  return filter.values.reduce((acc, {name, selected}) => {
    return selected ? [...acc, name] : acc
  }, [] as string[])
}

const FiltersTitle = styled.div`
  font-weight: 500;
  font-size: 1.25rem;
  color: ${(props) => props.theme.palette.headerTextColor};
`
const FilterTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
const ClearButton = styled(Button)`
  color: ${props => props.theme.palette.mutedText};
`
const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const HubFilters = ({ filters, setFilters, getHubImages }: HubFilterProps) => {
  const dispatch = useDispatch()
  const handleFilterChange = (
    filterCategoryIndex: number,
    index: number,
    value: boolean
  ) => {
    filters[filterCategoryIndex].values[index].selected = value
    dispatch(selectFilter(filters[filterCategoryIndex].values[index].name))
    setFilters(filters)
    getHubImages(getSelectedFilters(filters))
  }
  const handleClearFilters = (filterCategoryIndex: number) => {
    filters[filterCategoryIndex] = {...filters[filterCategoryIndex],
      values: filters[filterCategoryIndex].values.map(v => ({...v, selected: false}))}
    dispatch(clearFilters(filters[filterCategoryIndex].values.map(filter => filter.name)))
    setFilters(filters)
    getHubImages(getSelectedFilters(filters))
  }
  return (
    <div data-name="hubImagesFilter">
      {filters &&
        filters.map((filter: Filter, filterCategoryIndex: number) => (
          <div key={filterCategoryIndex}>
            <FilterTitleContainer>
              <FiltersTitle>{filter.filterLabel}</FiltersTitle>
              <ClearButton onClick={() => handleClearFilters(filterCategoryIndex)}>Clear All</ClearButton>
            </FilterTitleContainer>
            <FiltersContainer>
              {filter.values.map(({name, selected, count}, index) => (
                <FilterButton
                  filter={filter}
                  value={selected}
                  index={index}
                  key={index}
                  label={name}
                  count={count}
                  filterCategoryIndex={filterCategoryIndex}
                  handleFilterChange={handleFilterChange}
                />
              ))}
            </FiltersContainer>
          </div>
        ))}
    </div>
  )
}

export default HubFilters
