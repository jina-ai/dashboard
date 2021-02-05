import { serializeQueryParams } from "../hubApi";
describe("parameter serializer", () => {
  it("serializes params", () => {
    const paramsObject = {
      kind: ["encoder"],
      type: ["script"],
      somethingUndefined: undefined,
      emptyArray: [],
    };

    expect(serializeQueryParams(paramsObject)).toEqual(
      "kind=encoder&type=script"
    );
  });
});
