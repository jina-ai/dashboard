import {
  serializeQueryParams,
  getRawMarkdownURL,
  getDocumentationHTML,
  getHubImages,
} from "../hubApi"
import axios from "axios"
import MockAdapter from "axios-mock-adapter"

const mockAxios = new MockAdapter(axios)

describe("parameter serializer", () => {
  it("serializes params", () => {
    const paramsObject = {
      kind: ["encoder"],
      type: ["script"],
      somethingUndefined: undefined,
      emptyArray: [],
    }

    expect(serializeQueryParams(paramsObject)).toEqual(
      "kind=encoder&type=script"
    )
  })
})

describe("getRawMarkdownURL", () => {
  it("gets raw markdown URL for documentations", () => {
    expect(getRawMarkdownURL("https://github.com/jina-ai/jina-hub")).toEqual(
      "https://raw.githubusercontent.com/jina-ai/jina-hub/master/README.md"
    )
    expect(
      getRawMarkdownURL(
        "https://github.com/jina-ai/jina-hub/blob/master/encoders/image/BigTransferEncoder/README.md"
      )
    ).toEqual(
      "https://raw.githubusercontent.com/jina-ai/jina-hub/master/encoders/image/BigTransferEncoder/README.md"
    )
  })
})

describe("getDocumentationHTML", () => {
  it("gets documentation in HTML format", () => {
    mockAxios
      .onGet(
        "https://raw.githubusercontent.com/jina-ai/jina-hub/master/encoders/image/BigTransferEncoder/README.md"
      )
      .reply(200, { data: "## Documentation in markdown" })
    mockAxios
      .onPost("https://api.github.com/markdown")
      .reply(200, { data: "<h2> Documentation in HTML </h2>" })

    getDocumentationHTML(
      "https://github.com/jina-ai/jina-hub/blob/master/encoders/image/BigTransferEncoder/README.md"
    ).then((response) => {
      expect(response).toEqual({ data: "<h2> Documentation in HTML </h2>" })
    })
  })
})

describe("getHubImage", () => {
  it("gets hub images", () => {
    mockAxios
      .onGet("https://hubapi.jina.ai/images")
      .reply(200, ["Sunflowers", "Boy with an apple"])

    getHubImages({ kind: ["encoder"], keywords: ["script"] }).then(
      (response) => {
        expect(response).toEqual(["Sunflowers", "Boy with an apple"])
      }
    )
  })
})
