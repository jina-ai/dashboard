import React, { useState } from "react"
import styled from "@emotion/styled"
import { Button } from "@material-ui/core"
import { Filter } from "../../redux/hub/hub.types"

const ToggleButton = styled(Button)`
    display: flex;
    margin: .5rem;
`

type FilterButtonProps = {
  filter: Filter
  value: boolean
  label: string
  filterCategoryIndex: number
  index: number
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
      disabled={selected}
      onClick={() => handleFilterSelect()}
    >
      {label}
    </ToggleButton>
  )
}

export default FilterButton
