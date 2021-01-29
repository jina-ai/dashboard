import { getSelectedFilters, getKeysWithTrueValue, Filter } from "./HubFilters";

describe("getKeysWithTrueValue", () => {
  it("filters out keys with false value", () => {
    expect(
      getKeysWithTrueValue(({
        values: { a: false, b: true, c: false, d: true },
      } as unknown) as Filter)
    ).toEqual(["b", "d"]);
  });
});

describe("getSelectedFilters", () => {
  const filters = [
    {
      values: { a: true, b: true, c: false },
    },
    {
      values: { audio: true, text: false },
    },
  ];
  it("gets kind and keyword filters", () => {
    expect(getSelectedFilters((filters as unknown) as Filter[])).toEqual({
      kind: ["a", "b"],
      keywords: ["audio"],
    });
  });
});
