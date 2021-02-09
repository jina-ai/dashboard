import { State } from "../index";

const tagsToHide = [
  "Some keywords to describe the executor",
  "separated by commas",
];

export const selectHubImages = (state: State) =>
  state.hubState.images.map((image) => {
    const keywords = image.keywords;
    return {
      ...image,
      keywords: keywords.filter((keyword) => !tagsToHide.includes(keyword)),
    };
  });

export const selectIsHubImagesLoading = (state: State) =>
  state.hubState.loading;
