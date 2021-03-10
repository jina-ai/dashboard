import axios from "axios"
import * as queryString from "query-string"
import { FilterParams } from "../components/Hub/HubFilters"
import { GithubCode, User } from "../redux/global/global.types"

const HUB_API_ENDPOINT = process.env.REACT_APP_HUB_API!

export const getHubImages = async (filters: FilterParams) => {
  const response = await axios.get(HUB_API_ENDPOINT + "/images", {
    params: filters,
    paramsSerializer: (params) => serializeQueryParams(params),
  })

  return response.data
}

export const getDocumentationHTML = async (url: string) => {
  const rawMarkdownURL = getRawMarkdownURL(url)
  const rawMarkdownResponse = await axios.get(rawMarkdownURL)
  const HTMLResponse = await axios.post("https://api.github.com/markdown", {
    text: rawMarkdownResponse.data,
  })

  return HTMLResponse.data
}

export const serializeQueryParams = (params: {
  kind: string[]
  type: string[]
  somethingUndefined: undefined
  emptyArray: never[]
}) => queryString.stringify(params, { arrayFormat: "comma", skipNull: true })

export const getRawMarkdownURL = (url: string): string => {
  const defaultRawMarkdownURL =
    "https://raw.githubusercontent.com/jina-ai/jina-hub/master/README.md"

  return url.includes("/blob/master/")
    ? url.replace("github", "raw.githubusercontent").replace("/blob", "")
    : defaultRawMarkdownURL
}

export async function loginAndGetUserinfo(
  githubCode: GithubCode
): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        displayName: "dummy",
        username: "dummyUser",
        emails: ["dummy@dummy.com"],
        id: "1234sadf4234",
        nodeId: "dsfs234asdf",
        githubCode,
      })
    }, 4000)
  })
}
