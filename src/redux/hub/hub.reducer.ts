import { HubState, HubActionTypes } from "./hub.types"
import {
  FETCH_HUB_IMAGES,
  FETCH_HUB_IMAGES_SUCCESS,
  FETCH_HUB_IMAGES_FAILURE,
  initialHubState,
  SELECT_FILTER,
} from "./hub.constants"
import produce from "immer"
import _ from "lodash"

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
    case SELECT_FILTER:
      draft.selectedFilters = _.xor(draft.selectedFilters, [action.payload.filter])
  }
}, initialHubState)

export default hubReducer
