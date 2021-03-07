import { serializeQueryParams, getRawMarkdownURL } from "../hubApi";
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

describe("getRawMarkdownURL", () => {
  expect(getRawMarkdownURL("https://github.com/jina-ai/jina-hub")).toEqual(
    "https://raw.githubusercontent.com/jina-ai/jina-hub/master/README.md"
  );
  expect(
    getRawMarkdownURL(
      "https://github.com/jina-ai/jina-hub/blob/master/encoders/image/BigTransferEncoder/README.md"
    )
  ).toEqual(
    "https://raw.githubusercontent.com/jina-ai/jina-hub/master/encoders/image/BigTransferEncoder/README.md"
  );
});
