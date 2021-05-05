import { State } from "../index";
import { Filter, HubImage } from "./hub.types";

// Todo: Ideally, we shouldn't remove keywords. This should be fixed with providing correct data
const tagsToHide = [
  "Some keywords to describe the executor",
  "separated by commas",
];

const filters = {
  "Executor type": ["Classifier", "Evaluator", "Crafter", "Segementer", "Ranker", "Indexer", "Encoder"],
  "Domain space": ["Text", "Audio", "Video", "Image", "Cross modal", "Multi modal", "PDF"],
  "Libraries": ["Tensorflow", "Keras", "Numpy", "Pytorch", "Onnx", "Transformers", "sklearn", "PaddlePaddle", "librosa", "nltk"],
  "Language": ["English", "Chinese", "Multilingual"]
}

type FilterKeyType = keyof typeof filters


export const selectHubFilters = (state: State): Filter[] => {
  const currentFilters = Object.keys(filters).map(filterKey => {
    const applicableFilters = [
      ...state.hubState.images.map(image => image.kind),
      ...state.hubState.images.reduce((acc, image) => ([...acc, ...image.keywords]), [] as string[] )
    ]
    return ({
      filterLabel: filterKey,
      values: filters[filterKey as FilterKeyType].map(filterValue => (
        {
          name: filterValue,
          selected: state.hubState.selectedFilters.includes(filterValue),
          count: getImagesCountForFilter(filterValue, applicableFilters)
        }
      ))
    })
  })
  return currentFilters
}

export const getImagesCountForFilter = (filter: string, applicableFilters: string[]): number => {
  return applicableFilters.filter(f => f.toLowerCase() === filter.toLowerCase()).length
}

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

export const selectHubImagesFetchError = (state: State) =>
  state.hubState.error
