import React from "react"
import {
  FormControl,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core"
import styled from "@emotion/styled/macro"

type Props = {
  selectedSortOption: string
  sortOptions: string[]
  handleSortOption: (event: React.ChangeEvent<{ value: string }>) => void
}

const HubSortInput = styled(InputBase)`
  input {
    position: relative;
    borderradius: 4px;
    border: 1px solid #e5e5e5;
    padding: 8px 16px;
  }
`

const SortLabel = styled(InputLabel)`
  backgroundcolor: "white";
  padding: 0.25rem;
  margintop: -0.125rem;
`

const HubSortDropdown = ({
  selectedSortOption,
  sortOptions,
  handleSortOption,
}: Props) => {
  return (
    <FormControl>
      <SortLabel shrink>Sort</SortLabel>
      <Select
        value={selectedSortOption}
        onChange={handleSortOption}
        input={<HubSortInput />}
        data-name={`selectedHubSortDropdown-${selectedSortOption.replaceAll(
          " ",
          "_"
        )}`}
      >
        {sortOptions.map((sortOption) => (
          <MenuItem
            data-name={`sortOptionHubSortDropdown-${sortOption.replaceAll(
              " ",
              "_"
            )}`}
            value={sortOption}
          >
            {sortOption}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default HubSortDropdown
