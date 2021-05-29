import React from "react"
import styled from "@emotion/styled"
import { TextField } from "@material-ui/core"

type Props = {
  value: string | number
  placeholder?: string
  variant?: string
  onChange: (newValue: string) => void
  onSearch?: (value: string | number) => void
}

const InputPrepend = styled.div`
  cursor: pointer;
`

function ExpandingSearchbar({
  value,
  onChange,
  onSearch,
  placeholder,
  variant,
}: Props) {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch && onSearch(value)
    }
  }
  const clearSearch = () => {
    onChange("")
    onSearch && onSearch("")
  }
  return (
    <div
      className={`expanding-searchbar expanding-searchbar-${
        variant || "default"
      }`}
    >
      <div>
        <InputPrepend
          className="ml-auto"
          onClick={(event: React.MouseEvent<HTMLDivElement>) =>
            onSearch && onSearch(value)
          }
        >
            <i className="material-icons">search</i>
        </InputPrepend>
        <TextField
          type="text"
          role="input"
          placeholder={placeholder}
          value={value}
          onChange={(e: any) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <div>
          <div>
            <i
              className={`cursor-pointer text-muted material-icons mr-3 ${
                !value ? "d-invisible" : ""
              }`}
              onClick={clearSearch}
            >
              cancel
            </i>
          </div>
        </div>
      </div>
    </div>
  )
}

export { ExpandingSearchbar }
