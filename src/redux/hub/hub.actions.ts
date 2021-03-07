import {
  FETCH_HUB_IMAGES,
  FETCH_HUB_IMAGES_SUCCESS,
  FETCH_HUB_IMAGES_FAILURE,
} from "./hub.constants";
import {
  HubActionTypes,
  HubImage,
  FetchHubImagesSuccessAction,
  FetchHubImagesFailureAction,
} from "./hub.types";
import { Dispatch } from "redux";
import { getHubImages } from "../../services/hubApi";
import { FilterParams } from "../../components/Hub/HubFilters";
import { AppThunk } from "..";

const defaultParams = { kind: [], keywords: [] };

export const fetchHubImages = (
  filters: FilterParams = defaultParams
): AppThunk<Promise<void>> => async (dispatch: Dispatch<HubActionTypes>) => {
  try {
    dispatch({
      type: FETCH_HUB_IMAGES,
    });

    const images = await getHubImages(filters);

    dispatch(fetchHubImagesSuccess(images));
  } catch (e) {
    dispatch(fetchHubImagesFailure(e));
  }
};

const fetchHubImagesSuccess = (
  images: HubImage[]
): FetchHubImagesSuccessAction => {
  return {
    type: FETCH_HUB_IMAGES_SUCCESS,
    payload: { images },
  };
};

const fetchHubImagesFailure = (error: Error): FetchHubImagesFailureAction => {
  return {
    type: FETCH_HUB_IMAGES_FAILURE,
    payload: { error },
  };
};
