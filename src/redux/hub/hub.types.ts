import {
  FETCH_HUB_IMAGES,
  FETCH_HUB_IMAGES_SUCCESS,
  FETCH_HUB_IMAGES_FAILURE,
  SELECT_FILTER,
} from "./hub.constants";

export type HubImage = {
  "docker-name": string;
  version: string;
  "jina-version": string;
  "docker-command": string;
  name: string;
  description: string;
  type: string;
  kind: string;
  keywords: string[];
  platform: string[];
  license: string;
  url: string;
  documentation: string;
  author: string;
  avatar: string | null;
};

export type FilterMap = {
  name: string;
  selected: boolean;
  count: number;
};
export type Filter = {
  filterLabel: string;
  values: FilterMap[];
};

export type FilterParams = {
  kind: string[];
  keywords: string[];
  name?: string | null;
};

export type HubState = {
  images: HubImage[];
  loading: boolean;
  error: Error | null;
  selectedFilters: string[]
};

export type FetchHubImagesAction = {
  type: typeof FETCH_HUB_IMAGES;
};

export type FetchHubImagesSuccessAction = {
  type: typeof FETCH_HUB_IMAGES_SUCCESS;
  payload: {
    images: HubImage[];
  };
};

export type FetchHubImagesFailureAction = {
  type: typeof FETCH_HUB_IMAGES_FAILURE;
  payload: {
    error: Error;
  };
};
export type SelectFilterAction = {
  type: typeof SELECT_FILTER
  payload: {
    filter: string
  }
}
export type HubActionTypes =
  | FetchHubImagesAction
  | FetchHubImagesSuccessAction
  | FetchHubImagesFailureAction
  | SelectFilterAction;
