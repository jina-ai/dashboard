import React from "react"
import { Form, InputGroup } from "react-bootstrap"

type Props = {
  value: string | number
  placeholder?: string
  variant?: string
  onChange: (newValue: string) => void
  onSearch?: (value: string | number) => void
}

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
      <InputGroup>
        <InputGroup.Prepend
          className="ml-auto"
          onClick={(event: React.MouseEvent<HTMLDivElement>) =>
            onSearch && onSearch(value)
          }
        >
          <InputGroup.Text>
            <i className="material-icons">search</i>
          </InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e: any) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <InputGroup.Append>
          <InputGroup.Text>
            <i
              className={`cursor-pointer text-muted material-icons mr-3 ${
                !value ? "d-invisible" : ""
              }`}
              onClick={clearSearch}
            >
              cancel
            </i>
          </InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
    </div>
  )
}

export { ExpandingSearchbar }
