import { HubState, HubActionTypes } from "./hub.types"
import {
  FETCH_HUB_IMAGES,
  FETCH_HUB_IMAGES_SUCCESS,
  FETCH_HUB_IMAGES_FAILURE,
  initialHubState,
} from "./hub.constants"
import produce from "immer"

const hubReducer = produce((draft: HubState, action: HubActionTypes) => {
  switch (action.type) {
    case FETCH_HUB_IMAGES:
      draft.loading = true
      break
    case FETCH_HUB_IMAGES_SUCCESS:
      draft.loading = false
      draft.images = action.payload.images
      draft.error = null
      break
    case FETCH_HUB_IMAGES_FAILURE:
      draft.images = []
      draft.loading = false
      draft.error = action.payload.error
      break
  }
}, initialHubState)

export default hubReducer
