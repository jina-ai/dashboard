import { FETCH_HUB_IMAGES, FETCH_HUB_IMAGES_SUCCESS, FETCH_HUB_IMAGES_FAILURE } from "./hub.constants"
import {HubActionTypes} from "./hub.types"
import { Dispatch } from "redux"
import { getHubImages } from "../../services/hubApi"

export const fetchHubImages = () => async (dispatch: Dispatch<HubActionTypes>) => {
  try {
    dispatch({
      type: FETCH_HUB_IMAGES
    })

    const images = await getHubImages()

    dispatch({
      type: FETCH_HUB_IMAGES_SUCCESS,
      payload: {images}
    })
  } catch(e) {
    dispatch({
      type: FETCH_HUB_IMAGES_FAILURE
    })
  }
}