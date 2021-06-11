import { State } from "../index"
import { FilterCategory } from "./hub.types"

// Todo: Ideally, we shouldn't remove keywords. This should be fixed with providing correct data
const tagsToHide = [
  "Some keywords to describe the executor",
  "separated by commas",
]

const filters = {
  "Executor type": [
    "classifier",
    "evaluator",
    "crafter",
    "segementer",
    "ranker",
    "indexer",
    "encoder",
  ],
  "Domain space": [
    "text",
    "audio",
    "video",
    "image",
    "cross modal",
    "multi modal",
    "pdf",
  ],
  Libraries: [
    "tensorflow",
    "keras",
    "numpy",
    "pytorch",
    "onnx",
    "transformers",
    "sklearn",
    "paddlePaddle",
    "librosa",
    "nltk",
  ],
  Language: ["English", "Chinese", "Multilingual"],
}

type FilterKeyType = keyof typeof filters

export const selectHubFilters = (state: State): FilterCategory[] => {
  const currentFilters = Object.keys(filters).map((filterKey) => {
    const applicableFilters = [
      ...state.hubState.images.map((image) => image.kind),
      ...state.hubState.images.reduce(
        (acc, image) => [...acc, ...image.keywords],
        [] as string[]
      ),
    ]
    return {
      filterLabel: filterKey,
      values: filters[filterKey as FilterKeyType].map((filterValue) => ({
        name: filterValue,
        selected: state.hubState.selectedFilters.includes(filterValue),
        count: getImagesCountForFilter(filterValue, applicableFilters),
      })),
    }
  })
  return currentFilters
}

export const getImagesCountForFilter = (
  filter: string,
  applicableFilters: string[]
): number => {
  return applicableFilters.filter(
    (f) => f.toLowerCase() === filter.toLowerCase()
  ).length
}

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
