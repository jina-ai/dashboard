import React, { useState } from "react"
import styled from "@emotion/styled"
import { Button } from "@material-ui/core"
import { FilterCategory } from "../../redux/hub/hub.types"

type CheckboxLabelProps = {
  selected: boolean
  highlightColor?: string
}

const ToggleButton = styled(Button)`
  background-color: ${(props: CheckboxLabelProps) =>
    props.selected ? "#21A6A6" : "#E6F5F5"};
  color: ${(props: CheckboxLabelProps) =>
    props.selected ? "white" : "#1EA5A5"};
  box-shadow: none;
  display: flex;
  margin: 0.5rem;
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
