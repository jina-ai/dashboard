import React, { useState } from "react"
import styled from "@emotion/styled"
import { Button } from "@material-ui/core"
import { FilterCategory } from "../../redux/hub/hub.types"
import { Theme, useTheme } from "@emotion/react"

type CheckboxLabelProps = {
  selected: boolean
  highlightColor?: string
  filterCategoryIndex: number
  theme: Theme
}

const ToggleButton = styled(Button)`
  background-color: ${(props: CheckboxLabelProps) =>
    props.selected
      ? "#21A6A6"
      : props.theme.palette.filters[props.filterCategoryIndex].main};
  color: ${(props: CheckboxLabelProps) =>
    props.selected
      ? "white"
      : props.theme.palette.filters[props.filterCategoryIndex].contrastText};
  box-shadow: none;
  display: flex;
  margin: 0.5rem 1rem 0.5rem 0;
  text-transform: none;
  font-weight: normal;

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
  const theme = useTheme()

  return (
    <ToggleButton
      theme={theme}
      filterCategoryIndex={filterCategoryIndex}
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
