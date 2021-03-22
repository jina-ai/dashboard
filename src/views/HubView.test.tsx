import renderDashboardApp from "../tests/testUtils"
import { wait } from "@testing-library/dom"
import AxiosMockAdapter from "axios-mock-adapter"
import { jinadInstance } from "../services/jinad"

let mockJinadClient: AxiosMockAdapter
const mockImages = [
  {
    "docker-name": "jinahub/pod.crafter.arraybytesreader",
    version: "0.0.8",
    "jina-version": "1.0.8",
    "docker-command":
      "docker pull jinahub/pod.crafter.arraybytesreader:0.0.8-1.0.8",
    name: "ArrayBytesReader",
    description:
      "converts a byte stream into a numpy array and save to the Document.",
    type: "pod",
    kind: "crafter",
    keywords: ["Some keywords to describe the executor", "separated by commas"],
    platform: ["linux/amd64"],
    license: "apache-2.0",
    url: "https://jina.ai",
    documentation: "https://github.com/jina-ai/jina-hub",
    author: "Jina AI Dev-Team (dev-team@jina.ai)",
    avatar: null,
  },
  {
    "docker-name": "jinahub/pod.crafter.arraystringreader",
    version: "0.0.8",
    "jina-version": "1.0.8",
    "docker-command":
      "docker pull jinahub/pod.crafter.arraystringreader:0.0.8-1.0.8",
    name: "ArrayStringReader",
    description:
      "convertsthe string of numbers into a numpy array and save to the Document.",
    type: "pod",
    kind: "crafter",
    keywords: ["Some keywords to describe the executor", "separated by commas"],
    platform: ["linux/amd64"],
    license: "apache-2.0",
    url: "https://jina.ai",
    documentation: "https://github.com/jina-ai/jina-hub",
    author: "Jina AI Dev-Team (dev-team@jina.ai)",
    avatar: null,
  },
]

describe("HubView integration test", () => {
  beforeAll(() => {
    mockJinadClient = new AxiosMockAdapter(jinadInstance)
  })

  beforeEach(() => {
    mockJinadClient.onGet("/images").reply(200, mockImages)
  })

  afterEach(() => {
    mockJinadClient.reset()
  })

  it("should render", async () => {
    const { getAllByText, getByText } = renderDashboardApp("/hub")
    await wait(() => {
      expect(getByText("Jina Hub")).not.toBeNull()
      expect(getByText("ArrayBytesReader")).not.toBeNull()
    })

    expect(getByText("Read more")).not.toBeNull()
    expect(getByText("Let's Go")).not.toBeNull()
    expect(getByText(mockImages[0].name)).not.toBeNull()
    expect(getAllByText(mockImages[0].author).length).toBeGreaterThan(0)
  })
})
