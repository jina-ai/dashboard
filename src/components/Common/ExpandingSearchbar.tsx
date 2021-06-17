import React from "react"
import styled from "@emotion/styled"
import { IconButton, InputBase } from "@material-ui/core"
import SearchIcon from "@material-ui/icons/Search"
import CancelIcon from "@material-ui/icons/Cancel"

type Props = {
  value: string | number
  onChange: (newValue: string) => void
  onSearch?: (value: string | number) => void
}

function ExpandingSearchbar({ onSearch, value, onChange }: Props) {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch && onSearch(value)
    }
  }
  const clearSearch = () => {
    onSearch && onSearch("")
  }

  const SearchBar = styled.div`
    display: flex;
    background-color: ${(props) => props.theme.palette.grey[100]};
    border-radius: 2px;
  `
  return (
    <SearchBar>
      <IconButton type="submit" onClick={() => onSearch && onSearch(value)}>
        <SearchIcon />
      </IconButton>
      <InputBase
        autoFocus={true}
        onChange={(e) => onChange(e.target.value)}
        defaultValue={value}
        placeholder="Search"
        onKeyPress={handleKeyPress}
      />
      {value && (
        <IconButton onClick={clearSearch}>
          <CancelIcon />
        </IconButton>
      )}
    </SearchBar>
  )
}

export { ExpandingSearchbar }
