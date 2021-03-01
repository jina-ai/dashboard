import {
  getImageFilters,
  removeDuplicates,
  convertArrayToFilterObject,
} from "./HubImagesList"
import { HubImage } from "../../redux/hub/hub.types"
import { Filter } from "./HubFilters"

describe("removeDuplicates", () => {
  it("removes duplicate elements in an array", () => {
    expect(removeDuplicates(["Leo", "Rafa", "Don", "Mike", "Don"])).toEqual([
      "Leo",
      "Rafa",
      "Don",
      "Mike",
    ])
    expect(removeDuplicates(["nice", "nice", "nice", "nice"])).toEqual(["nice"])
    expect(removeDuplicates(["n"])).toEqual(["n"])
  })
})

describe("convertArrayToFilterObject", () => {
  it("convert array to object with value false", () => {
    expect(
      convertArrayToFilterObject(
        ["a", "b", "c"],
        (undefined as unknown) as Filter
      )
    ).toEqual({ a: false, b: false, c: false })
  })
  it("takes current filters and uses them to set filters", () => {
    expect(
      convertArrayToFilterObject(["a", "b", "c"], {
        filterLabel: "lable",
        values: { a: true, b: false, c: true },
      })
    ).toEqual({ a: true, b: false, c: true })
  })
})

describe("getImageFilters", () => {
  it("creates filters from images", () => {
    const images = [
      {
        "docker-name": "jinahub/pod.encoder.bigtransferencoder",
        version: "0.0.6",
        "jina-version": "0.9.20",
        "docker-command":
          "docker pull jinahub/pod.encoder.bigtransferencoder:0.0.6-0.9.20",
        name: "BigTransferEncoder",
        type: "pod",
        kind: "crafter",
        keywords: ["Tensorflow", "Computer Vision"],
        license: "apache-2.0",
        documentation: "https://github.com/jina-ai/jina-hub",
        author: "Jina AI Dev-Team (dev-team@jina.ai)",
      },
      {
        "docker-name": "jinahub/pod.encoder.chromapitchencoder",
        version: "0.0.8",
        "jina-version": "0.9.19",
        "docker-command":
          "docker pull jinahub/pod.encoder.chromapitchencoder:0.0.8-0.9.19",
        name: "ChromaPitchEncoder",
        type: "pod",
        kind: "encoder",
        keywords: ["encoder", "audio", "chromagrams"],
        license: "apache-2.0",
        url: "https://jina.ai",
        documentation: "https://github.com/jina-ai/jina-hub",
        author: "Jina AI Dev-Team (dev-team@jina.ai)",
      },
      {
        "docker-name": "jinahub/pod.encoder.compressionvaeencoder",
        version: "0.0.5",
        "jina-version": "0.9.20",
        "docker-command":
          "docker pull jinahub/pod.encoder.compressionvaeencoder:0.0.5-0.9.20",
        name: "CompressionVaeEncoder",
        type: "pod",
        kind: "encoder",
        keywords: ["Tensorflow", "Computer Vision", "Variational Autoencoders"],
        platform: ["linux/amd64"],
        license: "apache-2.0",
        documentation: "https://github.com/jina-ai/jina-hub",
        author: "Jina AI Dev-Team (dev-team@jina.ai)",
      },
    ]

    const expectedFilters = [
      {
        filterLabel: "Type of image",
        values: { crafter: false, encoder: false },
      },
      {
        filterLabel: "Key domain of the image",
        values: {
          Tensorflow: false,
          "Computer Vision": false,
          encoder: false,
          audio: false,
          chromagrams: false,
          "Variational Autoencoders": false,
        },
      },
    ]

    expect(getImageFilters((images as unknown) as HubImage[], [])).toEqual(
      expectedFilters
    )
  })
})
