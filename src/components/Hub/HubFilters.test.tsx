import { getSelectedFilters, getCheckedFilterValues } from "./HubFilters"
import { FilterCategory } from "../../redux/hub/hub.types"

describe("getCheckedFilterValues", () => {
  it("filters out keys with false value", () => {
    expect(
      getCheckedFilterValues(({
        values: [
          { name: "a", selected: false, count: 0 },
          { name: "b", selected: true, count: 0 },
          { name: "c", selected: false, count: 0 },
          { name: "d", selected: true, count: 0 },
        ],
      } as unknown) as FilterCategory)
    ).toEqual(["b", "d"])
  })
})

describe("getSelectedFilters", () => {
  const filters = [
    {
      values: [
        { name: "a", selected: true, count: 0 },
        { name: "b", selected: true, count: 0 },
        { name: "c", selected: false, count: 0 },
        { name: "d", selected: false, count: 0 },
      ],
    },
    {
      values: [
        { name: "a", selected: false, count: 0 },
        { name: "audio", selected: true, count: 0 },
        { name: "c", selected: false, count: 0 },
        { name: "d", selected: false, count: 0 },
      ],
    },
    {
      values: [
        { name: "a", selected: false, count: 0 },
        { name: "onnx", selected: true, count: 0 },
        { name: "c", selected: false, count: 0 },
        { name: "d", selected: false, count: 0 },
      ],
    },
    {
      values: [
        { name: "a", selected: false, count: 0 },
        { name: "English", selected: true, count: 0 },
        { name: "c", selected: false, count: 0 },
        { name: "d", selected: false, count: 0 },
      ],
    },
  ]
  it("gets kind and keyword filters", () => {
    expect(
      getSelectedFilters((filters as unknown) as FilterCategory[])
    ).toEqual({
      kind: ["a", "b"],
      keywords: ["audio", "onnx", "English"],
    })
  })
})
