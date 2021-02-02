import {HubState, HubActionTypes} from "./hub.types";
import {
  FETCH_HUB_IMAGES, FETCH_HUB_IMAGES_SUCCESS, FETCH_HUB_IMAGES_FAILURE, initialHubState
} from "./hub.constants";

export default function globalReducer(
  state: HubState = initialHubState,
  action: HubActionTypes
): HubState {
  switch (action.type) {
    case FETCH_HUB_IMAGES:
      return {
        ...state,
        loading: true
      }
    case FETCH_HUB_IMAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        images: action.payload.images
      };
    case FETCH_HUB_IMAGES_FAILURE:
      return {
        ...state,
        loading: false,
        error: null
      };
    default:
      return state;
  }
}