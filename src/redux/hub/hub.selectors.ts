import { State } from "../index";

export const selectHubImages = (state: State) => state.hubState.images;

export const selectIsHubImagesLoading = (state: State) =>
  state.hubState.loading;
