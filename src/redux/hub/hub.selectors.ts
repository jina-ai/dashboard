import { State } from "../index";
import { Filter, FilterMap } from "../../components/Hub/HubFilters"

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
    return ( {
      filterLabel: filterKey,
      values: filters[filterKey as FilterKeyType].map(filterValue => (
       { name: filterValue, selected: false, count: 2 }
      ))
    })
  })
  return currentFilters
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
