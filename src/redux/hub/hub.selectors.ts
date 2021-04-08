import { State } from "../index"

// Todo: Ideally, we shouldn't remove keywords. This should be fixed with providing correct data
const tagsToHide = [
  "Some keywords to describe the executor",
  "separated by commas",
]

export const selectHubImages = (state: State) =>
  state.hubState.images.map((image) => {
    const keywords = image.keywords
    return {
      ...image,
      keywords: keywords.filter((keyword) => !tagsToHide.includes(keyword)),
    }
  })

export const selectIsHubImagesLoading = (state: State) => state.hubState.loading

export const selectHubImagesFetchError = (state: State) => state.hubState.error
