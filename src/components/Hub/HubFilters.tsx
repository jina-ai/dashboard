import React from "react"
import styled from "@emotion/styled"
import { useSelector, useDispatch } from "react-redux"
import FilterButton from "./FilterButton"
import { Filter, FilterParams} from "../../redux/hub/hub.types"
import { selectFilter } from "../../redux/hub/hub.actions"

type HubFilterProps = {
  filters: Filter[]
  setFilters: (filters: Filter[]) => void
  getHubImages: (filters: FilterParams) => void
}

export const getSelectedFilters = (filters: Filter[]): FilterParams => {
  return {
    kind: getCheckedFilterValues(filters[0]),
    keywords: getCheckedFilterValues(filters[1]),
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
  return (
    <div data-name="hubImagesFilter">
      {filters &&
        filters.map((filter: Filter, filterCategoryIndex: number) => (
          <div key={filterCategoryIndex}>
            <FiltersTitle>{filter.filterLabel}</FiltersTitle>
            <FiltersContainer>
              {filter.values.map(({name, selected, count}, index) => (
                <FilterButton
                  filter={filter}
                  value={selected}
                  index={index}
                  key={index}
                  label={name}
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
