import { HubState, HubActionTypes } from "./hub.types"
import {
  FETCH_HUB_IMAGES,
  FETCH_HUB_IMAGES_SUCCESS,
  FETCH_HUB_IMAGES_FAILURE,
  initialHubState,
  PICK_FILTER,
  CLEAR_FILTERS,
} from "./hub.constants"
import produce from "immer"
import { xor } from "lodash"

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
    case PICK_FILTER:
      draft.selectedFilters = xor(draft.selectedFilters, [
        action.payload.filter,
      ])
      break
    case CLEAR_FILTERS:
      draft.selectedFilters = draft.selectedFilters.filter(
        (selectedFilter) => !action.payload.filters.includes(selectedFilter)
      )
  }
}, initialHubState)

export default hubReducer
