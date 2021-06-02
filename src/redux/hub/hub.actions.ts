import {
  FETCH_HUB_IMAGES,
  FETCH_HUB_IMAGES_SUCCESS,
  FETCH_HUB_IMAGES_FAILURE,
  PICK_FILTER,
  CLEAR_FILTERS,
} from "./hub.constants"
import {
  HubActionTypes,
  HubImage,
  FetchHubImagesSuccessAction,
  FetchHubImagesFailureAction,
  PickFilterAction,
  ClearFiltersAction,
} from "./hub.types"
import { Dispatch } from "redux"
import { getHubImages } from "../../services/hubApi"
import { FilterParams } from "../hub/hub.types"
import { AppThunk } from ".."

const defaultParams = { kind: [], keywords: [] }

export const fetchHubImages = (
  filters: FilterParams = defaultParams
): AppThunk<Promise<void>> => async (dispatch: Dispatch<HubActionTypes>) => {
  try {
    dispatch({
      type: FETCH_HUB_IMAGES,
    })

    const images = await getHubImages(filters)

    dispatch(fetchHubImagesSuccess(images))
  } catch (e) {
    dispatch(fetchHubImagesFailure(e))
  }
}

const fetchHubImagesSuccess = (
  images: HubImage[]
): FetchHubImagesSuccessAction => {
  return {
    type: FETCH_HUB_IMAGES_SUCCESS,
    payload: { images },
  }
}

const fetchHubImagesFailure = (error: Error): FetchHubImagesFailureAction => {
  return {
    type: FETCH_HUB_IMAGES_FAILURE,
    payload: { error },
  }
}

export const pickFilter = (filter: string): PickFilterAction => {
  return {
    type: PICK_FILTER,
    payload: { filter },
  }
}

export const clearFilters = (filters: string[]): ClearFiltersAction => {
  return {
    type: CLEAR_FILTERS,
    payload: { filters },
  }
}
