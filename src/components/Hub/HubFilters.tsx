import React from "react"
import styled from "@emotion/styled"
import FilterButton from "./FilterButton"

export type FilterMap = {
  name: string
  selected: boolean
  count: number
}
export type FilterParams = {
  kind: string[]
  keywords: string[]
  name?: string | null
}
export type Filter = {
  filterLabel: string
  values: FilterMap[]
}
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
  return Object.keys(filter.values).reduce((acc, key) => {
    let filterValue = filter.values
    return filterValue[key] ? [...acc, key] : acc
  }, [] as string[])
}

const FiltersTitle = styled.div`
  font-weight: 500;
  font-size: 1.25rem;
`

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const HubFilters = ({ filters, setFilters, getHubImages }: HubFilterProps) => {
  const handleFilterChange = (
    filterCategoryIndex: number,
    key: string,
    value: boolean
  ) => {
    filters[filterCategoryIndex].values[key] = value
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
              {filter.values.map(({name, selected, count}) => (
                <FilterButton
                  filter={filter}
                  value={selected}
                  key={name}
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
