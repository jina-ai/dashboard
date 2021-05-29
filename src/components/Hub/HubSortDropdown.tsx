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
        id="demo-simple-select-placeholder-label-label"
      >
        Sort
      </InputLabel>
      <Select
        labelId="demo-customized-select-label"
        id="demo-customized-select"
        value={selectedSortOption}
        onChange={handleSortOption}
        input={<BootstrapInput />}
      >
        {sortOptions.map((sortOption) => (
          <MenuItem value={sortOption}>{sortOption}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default HubSortDropdown
