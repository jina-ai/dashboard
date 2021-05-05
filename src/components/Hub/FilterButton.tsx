import React, { useState } from "react"
import styled from "@emotion/styled"
import { Button } from "@material-ui/core"
import { Filter } from "../../redux/hub/hub.types"

type CheckboxLabelProps = {
  selected: boolean
  highlightColor?: string
}

const ToggleButton = styled(Button)`
  background-color: ${(props: CheckboxLabelProps) =>
    props.selected ? '#21A6A6' : '#E6F5F5'};
  color: ${(props: CheckboxLabelProps) =>
    props.selected ? 'white' : '#1EA5A5'};
  box-shadow: none;
  display: flex;
  margin: .5rem;
`

type FilterButtonProps = {
  filter: Filter
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
