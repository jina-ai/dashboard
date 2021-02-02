import {
  FETCH_HUB_IMAGES,
  FETCH_HUB_IMAGES_SUCCESS,
  FETCH_HUB_IMAGES_FAILURE
} from "./hub.constants";

export type HubImage = {
  "docker-name" : string
  version : string
  "jina-version" : string
  "docker-command" : string
  name : string
  description : string
  type : string
  kind : string
  keywords : string[]
  platform : string[]
  license : string
  url : string
  documentation : string
  author : string
  avatar : string | null
}

export type HubState = {
  images: HubImage[]
  loading: boolean
  error: null
};

export type FetchHubImagesAction = {
  type: typeof FETCH_HUB_IMAGES
};

export type FetchHubImagesSuccessAction = {
  type: typeof FETCH_HUB_IMAGES_SUCCESS
  payload: {
    images: HubImage[];
  };
};

export type FetchHubImagesFailureAction = {
  type: typeof FETCH_HUB_IMAGES_FAILURE
};
export type HubActionTypes =
  | FetchHubImagesAction
  | FetchHubImagesSuccessAction
  | FetchHubImagesFailureAction