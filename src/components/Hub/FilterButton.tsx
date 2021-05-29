import React, { useState } from "react"
import styled from "@emotion/styled"
import { Button } from "@material-ui/core"
import { FilterCategory, FilterCategoryName } from "../../redux/hub/hub.types"

type FilterButtonColors = {
  [category in FilterCategoryName]: {
    backgroundColor: string
    color: string
  }
}

const filterButtonColors: FilterButtonColors = {
  "Executor type": {
    backgroundColor: "#E6F5F5",
    color: "#1EA5A5",
  },
  "Domain space": {
    backgroundColor: "#EFF2FE",
    color: "#8A8AE9",
  },
  Libraries: {
    backgroundColor: "#E6F5F5",
    color: "#009999",
  },
  Language: {
    backgroundColor: "#FFFAE2",
    color: "#EE9518",
  },
}

type CheckboxLabelProps = {
  selected: boolean
  highlightColor?: string
  filterCategory: FilterCategoryName
}

const ToggleButton = styled(Button)`
  background-color: ${(props: CheckboxLabelProps) =>
    props.selected
      ? "#21A6A6"
      : filterButtonColors[props.filterCategory].backgroundColor};
  color: ${(props: CheckboxLabelProps) =>
    props.selected ? "white" : filterButtonColors[props.filterCategory].color};
  box-shadow: none;
  display: flex;
  margin: 0.5rem 1rem 0.5rem 0;
  text-transform: none;

  &:hover {
    background-color: #21a6a6;
    color: white;
  }
`

type FilterButtonProps = {
  filter: FilterCategory
  value: boolean
  label: string
  filterCategoryIndex: number
  index: number
  count: number
  handleFilterChange: (
    filterCategoryIndex: number,
    index: number,
    value: boolean
  ) => void
}

const FilterButton = ({
  filter,
  value,
  label,
  index,
  count,
  filterCategoryIndex,
  handleFilterChange,
}: FilterButtonProps) => {
  const [selected, setSelected] = useState(value)
  const handleFilterSelect = () => {
    setSelected(!selected)
    handleFilterChange(filterCategoryIndex, index, !selected)
  }
  return (
    <ToggleButton
      filterCategory={filter.filterLabel}
      variant="contained"
      selected={value}
      disabled={count === 0}
      onClick={() => handleFilterSelect()}
    >
      {label} ({count})
    </ToggleButton>
  )
}

export default FilterButton
