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

const SortSelect = styled(Select)`
  border-radius: 4px;
  border: 1px solid #9e9e9e;
  padding: 0.25rem;
  padding-left: 1rem;
  background-color: white;
`

const SortLabel = styled(InputLabel)`
  margin-top: -0.125rem;
  background-color: ${(props) => props.theme.palette.background.default};
  padding: 0.25rem;
`

const HubSortDropdown = ({
  selectedSortOption,
  sortOptions,
  handleSortOption,
}: Props) => {
  return (
    <FormControl>
      <SortLabel shrink>Sort</SortLabel>
      <SortSelect
        value={selectedSortOption}
        onChange={handleSortOption}
        input={<InputBase />}
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
      </SortSelect>
    </FormControl>
  )
}

export default HubSortDropdown
