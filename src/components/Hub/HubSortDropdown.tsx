import React from "react"
import {
  createStyles,
  FormControl,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  Theme,
  withStyles,
} from "@material-ui/core"

type Props = {
  selectedSortOption: string
  sortOptions: string[]
  handleSortOption: (event: React.ChangeEvent<{ value: string }>) => void
}

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    input: {
      position: "relative",
      borderRadius: 4,
      border: "1px solid #E5E5E5",
      padding: "8px 16px",
    },
  })
)(InputBase)

const HubSortDropdown = ({
  selectedSortOption,
  sortOptions,
  handleSortOption,
}: Props) => {
  return (
    <FormControl>
      <InputLabel
        style={{ backgroundColor: "white", padding: 4, marginTop: -2 }}
        shrink
      >
        Sort
      </InputLabel>
      <Select
        value={selectedSortOption}
        onChange={handleSortOption}
        input={<BootstrapInput />}
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
