import React, {useState} from "react";
import styled from "@emotion/styled";

export type FilterObject = { [key: string]: boolean }
export type Filter = {
    filterLabel: string
    values: FilterObject
}
type HubFilterProps = {
    filters: Filter[]
    setFilters: (filters: Filter[]) => void
}

const FiltersTitle = styled.div`
    font-weight: 500;
    font-size: 1.25rem;
`

const FiltersContainer = styled.div`
    display: flex;
    flex-direction: column;
`
// Hide checkbox but keep it in the DOM for accessibility
const Checkbox = styled.input`
    margin-right: -1rem;
    opacity: 0;
`
type CheckboxLabelProps = {
    checked: boolean
}
const CheckboxLabel = styled.label`
    border: ${(props: CheckboxLabelProps) => (props.checked ? '1px solid #007AFF' : 'none')};
    border-radius: .25rem;
    padding: .25rem;
`

const HubFilters = ({ filters, setFilters }: HubFilterProps) => {
    const handleFilterChange = (filterCategoryIndex: number, key: string, value: boolean) => {
        filters[filterCategoryIndex].values[key] = value
        setFilters(filters)
    }
    return (
        <>
            {filters && filters.map((filter: Filter, filterCategoryIndex: number) => (
                <>
                    <FiltersTitle>{filter.filterLabel}</FiltersTitle>
                    <FiltersContainer>

                        {Object.keys(filter.values).map((key) =>
                            <FilterCheckbox 
                                filter={filter}
                                value={filter.values[key]}
                                key={key}
                                label={key}
                                filterCategoryIndex={filterCategoryIndex}
                                handleFilterChange={handleFilterChange}
                                />
                            )
                        }
                    </FiltersContainer>
                </>
            ))}
        </>
    )
}

type FilterCheckboxProps = {
    filter: Filter
    value: boolean
    label: string
    filterCategoryIndex: number
    handleFilterChange: (filterCategoryIndex: number, key: string, value: boolean) => void
}

const FilterCheckbox = ({filter, value, label, filterCategoryIndex, handleFilterChange}: FilterCheckboxProps) => {
    const [checked, setChecked] = useState(value)
    const handleFilterSelect = () => {
        setChecked(!checked)
        handleFilterChange(filterCategoryIndex, label, value)
    } 
    return (
    <CheckboxLabel checked={checked}>
        <Checkbox
            type="checkbox"
            checked={checked}
            onChange={() => handleFilterSelect()} />
        {label}
    </CheckboxLabel>)
}

export default HubFilters