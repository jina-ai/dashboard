import { HubState} from "./hub.types";

export const FETCH_HUB_IMAGES = "FETCH_HUB_IMAGES";
export const FETCH_HUB_IMAGES_SUCCESS = "FETCH_HUB_IMAGES_SUCCESS";
export const FETCH_HUB_IMAGES_FAILURE= "FETCH_HUB_IMAGES_FAILURE";
export const SELECT_FILTER = "SELECT_FILTER"

export const HIDE_BANNER_TIMEOUT = 5000;

export const initialHubState: HubState = {
  images: [],
  loading: false,
  error: null,
  selectedFilters: []
};
