import React, { useState } from "react"
import styled from "@emotion/styled"
import { Button } from "@material-ui/core"
import { Filter } from "./HubFilters"

const ToggleButton = styled(Button)`
    display: flex;
    margin: .5rem;
`

type FilterButtonProps = {
  filter: Filter
  value: boolean
  label: string
  filterCategoryIndex: number
  handleFilterChange: (
    filterCategoryIndex: number,
    key: string,
    value: boolean
  ) => void
}

const FilterButton = ({
  value,
  label,
  filterCategoryIndex,
  handleFilterChange,
}: FilterButtonProps) => {
  const [selected, setSelected] = useState(value)
  const handleFilterSelect = () => {
    setSelected(!selected)
    handleFilterChange(filterCategoryIndex, label, !selected)
  }
  return (
    <ToggleButton
      variant="contained"
      disabled={selected}
      onClick={() => handleFilterSelect()}
    >
      {label}
    </ToggleButton>
  )
}

export default FilterButton
