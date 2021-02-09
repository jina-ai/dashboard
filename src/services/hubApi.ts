import axios from "axios";
import * as queryString from "query-string";
import { FilterParams } from "../components/Hub/HubFilters";

const HUB_API_ENDPOINT = process.env.REACT_APP_HUB_API!;

export const getHubImages = async (filters: FilterParams) => {
  const response = await axios.get(HUB_API_ENDPOINT + "/images", {
    params: filters,
    paramsSerializer: (params) => queryParamsSerializer(params),
  });

  return response.data;
};

export const getDocumentationHTML = async (url: string) => {
  const rawMarkdownURL = getRawMarkdownURL(url)
  const rawMarkdownResponse = await axios.get(rawMarkdownURL)
  const HTMLResponse = await axios.post("https://api.github.com/markdown", {text: rawMarkdownResponse.data})

  return HTMLResponse.data
}

export const queryParamsSerializer = (params: Record<string, any>) =>
  queryString.stringify(params, { arrayFormat: "comma", skipNull: true });

export const getRawMarkdownURL = (url: string): string =>
  `${url.replace('github', 'raw.githubusercontent')}/master/README.md`