import React from "react"
import Select, { Props as SelectProps } from "react-select"
import { StylesConfig } from "react-select/src/styles"
import { FilterSelection } from "../LogStream/LogsTable"

const customStyles: StylesConfig = {
  dropdownIndicator: (styles) => ({
    ...styles,
    color: "black",
  }),
  indicatorSeparator: (styles) => ({
    ...styles,
    opacity: "0",
  }),
  container: (provided, { selectProps: { width } }) => ({
    ...provided,
    width: width,
  }),
  option: (styles) => ({
    ...styles,
    cursor: "pointer",
  }),
  control: (styles) => ({
    ...styles,
    cursor: "pointer",
    border: "none",
    background: "#F6F8FA",
  }),
}

export type Props = {
  onFilterChange: (something: FilterSelection[]) => void
  options: { value: string; label: string }[]
  isMulti?: boolean
  isSearchable?: boolean
  clearAfter?: boolean
} & Omit<SelectProps, "isMulti">

function MultiFilterSelect({
  isMulti,
  isSearchable,
  clearAfter,
  onFilterChange,
  options,
  ...rest
}: Props) {
  let value = clearAfter ? null : undefined
  return (
    <Select
      onChange={(val) => {
        onFilterChange(Array.isArray(val) ? val : !val ? [] : [val])
      }}
      value={value}
      isMulti={isMulti}
      options={options}
      styles={customStyles}
      readOnly={true}
      isSearchable={isSearchable}
      {...rest}
    />
  )
}

export { MultiFilterSelect }
