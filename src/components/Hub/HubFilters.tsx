import React, { useState } from "react";
import styled from "@emotion/styled";

export type FilterMap = { [key: string]: boolean };
export type FilterParams = {
  kind: string[];
  keywords: string[];
};
export type Filter = {
  filterLabel: string;
  values: FilterMap;
};
type HubFilterProps = {
  filters: Filter[];
  setFilters: (filters: Filter[]) => void;
  getHubImages: (filters: FilterParams) => void;
};

export const getSelectedFilters = (filters: Filter[]) => {
  return {
    kind: getCheckedFilterValues(filters[0]),
    keywords: getCheckedFilterValues(filters[1]),
  };
};

export const getCheckedFilterValues = (filter: Filter) => {
  return Object.keys(filter.values).reduce((acc, key) => {
    let filterValue = filter.values;
    return filterValue[key] ? [...acc, key] : acc;
  }, [] as string[]);
};

const FiltersTitle = styled.div`
  font-weight: 500;
  font-size: 1.25rem;
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
// Hide checkbox but keep it in the DOM for accessibility
const Checkbox = styled.input`
  margin-right: -1rem;
  opacity: 0;
`;
type CheckboxLabelProps = {
  checked: boolean;
};
const CheckboxLabel = styled.label`
  border: ${(props: CheckboxLabelProps) =>
    props.checked ? "1px solid #007AFF" : "none"};
  border-radius: 0.25rem;
  padding: 0.25rem;
`;

const HubFilters = ({ filters, setFilters, getHubImages }: HubFilterProps) => {
  const handleFilterChange = (
    filterCategoryIndex: number,
    key: string,
    value: boolean
  ) => {
    filters[filterCategoryIndex].values[key] = value;
    setFilters(filters);
    getHubImages(getSelectedFilters(filters));
  };
  return (
    <div data-name="hubImagesFilter">
      {filters &&
        filters.map((filter: Filter, filterCategoryIndex: number) => (
          <div key={filterCategoryIndex}>
            <FiltersTitle>{filter.filterLabel}</FiltersTitle>
            <FiltersContainer>
              {Object.keys(filter.values).map((key) => (
                <FilterCheckbox
                  filter={filter}
                  value={filter.values[key]}
                  key={key}
                  label={key}
                  filterCategoryIndex={filterCategoryIndex}
                  handleFilterChange={handleFilterChange}
                />
              ))}
            </FiltersContainer>
          </div>
        ))}
    </div>
  );
};

type FilterCheckboxProps = {
  filter: Filter;
  value: boolean;
  label: string;
  filterCategoryIndex: number;
  handleFilterChange: (
    filterCategoryIndex: number,
    key: string,
    value: boolean
  ) => void;
};

const FilterCheckbox = ({
  filter,
  value,
  label,
  filterCategoryIndex,
  handleFilterChange,
}: FilterCheckboxProps) => {
  const [checked, setChecked] = useState(value);
  const handleFilterSelect = () => {
    setChecked(!checked);
    handleFilterChange(filterCategoryIndex, label, !checked);
  };
  return (
    <CheckboxLabel checked={checked}>
      <Checkbox
        type="checkbox"
        checked={checked}
        onChange={() => handleFilterSelect()}
      />
      {label}
    </CheckboxLabel>
  );
};

export default HubFilters;
