import React from "react";
import Select, { Props as SelectProps } from "react-select";

const CHART_LEVELS = [
  "INFO",
  "SUCCESS",
  "WARNING",
  "ERROR",
  "CRITICAL",
  "DEBUG",
] as const;

type LevelType = typeof CHART_LEVELS[number];
type Option = { value: string; label: string };

const customStyles = {
  container: (provided: any, { selectProps: { width } }: any) => ({
    ...provided,
    width: width,
  }),
};

export type Props = {
  onFilterChange: (val: any[]) => void;
  options: { value: string; label: string }[];
} & SelectProps;

function MultiFilterSelect({ onFilterChange, options, ...rest }: Props) {
  return (
    <Select
      onChange={(val) =>
        onFilterChange(Array.isArray(val) ? val : !val ? [] : [val])
      }
      isMulti
      options={options}
      styles={customStyles}
      {...rest}
    />
  );
}

export { MultiFilterSelect };
