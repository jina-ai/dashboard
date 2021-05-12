import { clearFilters, fetchHubImages, selectFilter } from "./hub.actions";
import {
  initialHubState,
  FETCH_HUB_IMAGES,
  FETCH_HUB_IMAGES_SUCCESS,
  FETCH_HUB_IMAGES_FAILURE,
  SELECT_FILTER,
  CLEAR_FILTERS,
} from "./hub.constants";
import { HubState, HubActionTypes, HubImage } from "./hub.types";
import hubReducer from "./hub.reducer";
import { selectHubImages, selectIsHubImagesLoading, selectHubImagesFetchError, selectHubFilters, getImagesCountForFilter } from "./hub.selectors";
import configureMockStore from "redux-mock-store";
import thunk, { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { State } from "../index";

const mockAxios = new MockAdapter(axios);

type DispatchExts = ThunkDispatch<State, void, AnyAction>;
const mockStore = configureMockStore<HubState, DispatchExts>([thunk]);

describe("hub actions", () => {
  describe("on fetching images", () => {
    it("dispatches FETCH_HUB_IMAGES_SUCCESS on successfull making network request", () => {
      const expectedActions = [
        { type: "FETCH_HUB_IMAGES" },
        {
          type: "FETCH_HUB_IMAGES_SUCCESS",
          payload: {
            images: ["Sunflowers", "Boy with an apple"],
          },
        },
      ];

      const store = mockStore(initialHubState);
      mockAxios
        .onGet("https://hubapi.jina.ai/images")
        .reply(200, ["Sunflowers", "Boy with an apple"]);

      store.dispatch(fetchHubImages()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe("on selecting filters", () => {
    it("dispatches SELECT_FILTER action", () => {
      const expectedActions = [
        { type: "SELECT_FILTER", payload: { filter: "multi-modal" } }
      ]

      const store = mockStore(initialHubState);
      store.dispatch(selectFilter("multi-modal"))
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
  describe("on clearing filters", () => {
    it("dispatches CLEAR_FILTER action", () => {
      const expectedActions = [
        { type: "CLEAR_FILTERS", payload: { filters: ["multi-modal", "audio"] } }
      ]

      const store = mockStore(initialHubState);
      store.dispatch(clearFilters(["multi-modal", "audio"]))
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
});

describe("hub reducer", () => {
  it("should have an initial state", () => {
    expect(hubReducer(undefined, {} as HubActionTypes)).toEqual(
      initialHubState
    );
  });
  it("sets state to loading on fetching images", () => {
    expect(
      hubReducer(initialHubState, { type: FETCH_HUB_IMAGES }).loading
    ).toBe(true);
  });
  it("sets state to loading on fetching images", () => {
    expect(
      hubReducer(
        { images: [], loading: true, error: null, selectedFilters: [] },
        {
          type: FETCH_HUB_IMAGES_SUCCESS,
          payload: {
            images: ([
              "Starry night",
              "Water lillies",
            ] as unknown) as HubImage[],
          },
        }
      ).loading
    ).toBe(false);
    expect(
      hubReducer(
        { images: [], loading: true, error: null, selectedFilters: [] },
        {
          type: FETCH_HUB_IMAGES_SUCCESS,
          payload: {
            images: ([
              "Starry night",
              "Water lillies",
            ] as unknown) as HubImage[],
          },
        }
      ).images
    ).toEqual(["Starry night", "Water lillies"]);
  });
  it("sets state error to null if fetching images succeeds", () => {
    expect(
      hubReducer(
        {
          images: [],
          loading: true,
          error: { name: "error name", message: "error message" },
          selectedFilters: []
        },
        {
          type: FETCH_HUB_IMAGES_SUCCESS,
          payload: {
            images: ([
              "Starry night",
              "Water lillies",
            ] as unknown) as HubImage[],
          },
        }
      ).error
    ).toEqual(null);
  });
  it("sets state to loading on fetching images", () => {
    expect(
      hubReducer(
        { images: [], loading: true, error: null, selectedFilters: [] },
        {
          type: FETCH_HUB_IMAGES_FAILURE,
          payload: {
            error: {
              name: "unforced error",
              message: "Everything's coming up Milhouse",
            },
          },
        }
      ).loading
    ).toBe(false);
    expect(
      hubReducer(
        { images: [], loading: true, error: null, selectedFilters: [] },
        {
          type: FETCH_HUB_IMAGES_FAILURE,
          payload: {
            error: {
              name: "unfortunate error",
              message: "it went south so quick",
            },
          },
        }
      ).error?.name
    ).toEqual("unfortunate error");
  });
  it("sets state images to [] if fetching images fails", () => {
    expect(
      hubReducer(
        {
          images: (["Starry night", "Water lillies"] as unknown) as HubImage[],
          loading: true,
          error: null,
          selectedFilters: []
        },
        {
          type: FETCH_HUB_IMAGES_FAILURE,
          payload: {
            error: {
              name: "unfortunate error",
              message: "it went south so quick",
            },
          },
        }
      ).images
    ).toEqual([]);
  })
  it("updates selected filters", () => {
    expect(
      hubReducer(
        {
          images: (["Starry night", "Water lillies"] as unknown) as HubImage[],
          loading: true,
          error: null,
          selectedFilters: []
        },
        {
          type: SELECT_FILTER,
          payload: {
            filter: "Multimodal"
          }
        }
      ).selectedFilters
    ).toEqual(["Multimodal"])
  })
  it("updates selected filters", () => {
    expect(
      hubReducer(
        {
          images: (["Starry night", "Water lillies"] as unknown) as HubImage[],
          loading: true,
          error: null,
          selectedFilters: ["Multimodal"]
        },
        {
          type: SELECT_FILTER,
          payload: {
            filter: "Multimodal"
          }
        }
      ).selectedFilters
    ).toEqual([])
  })
  it("updates selected filters", () => {
    expect(
      hubReducer(
        {
          images: (["Starry night", "Water lillies"] as unknown) as HubImage[],
          loading: true,
          error: null,
          selectedFilters: ["Multimodal", "onnx", "Tensorflow"]
        },
        {
          type: SELECT_FILTER,
          payload: {
            filter: "Multimodal"
          }
        }
      ).selectedFilters
    ).toEqual(["onnx", "Tensorflow"])
  })
  it("clears filters", () => {
    expect(
      hubReducer(
        {
          images: (["Starry night", "Water lillies"] as unknown) as HubImage[],
          loading: true,
          error: null,
          selectedFilters: ["Multimodal", "onnx", "Tensorflow"]
        },
        {
          type: CLEAR_FILTERS,
          payload: {
            filters: ["Multimodal", "onnx"]
          }
        }
      ).selectedFilters
    ).toEqual(["Tensorflow"])
  })
});

describe("hub selectors", () => {
  describe("selectIsHubImagesLoading", () => {
    it("returns hubstate loading property", () => {
      expect(
        selectIsHubImagesLoading({ hubState: { loading: true } } as State)
      ).toBe(true);
      expect(
        selectIsHubImagesLoading({ hubState: { loading: false } } as State)
      ).toBe(false);
    });
  });

  describe("selectHubImages", () => {
    const inputImages = [
      { keywords: ["encoder", "audio"] },
      { keywords: ["separated by commas"] },
    ];

    const expectedImages = [
      { keywords: ["encoder", "audio"] },
      { keywords: [] },
    ];
    it("filters keywords to remove placeholder keywords", () => {
      expect(
        selectHubImages({ hubState: { images: inputImages } } as State)
      ).toEqual(expectedImages);
    });
  });

  describe("selectHubFilters", () => {
    const inputImages = [
      { keywords: ["Text", "Audio"], kind: "Indexer" },
      { keywords: ["Text", "PDF"], kind: "Indexer" },
      { keywords: ["Audio", "Onnx"], kind: "Encoder" },
    ]

    it("gets applied filter count", () => {
      expect(getImagesCountForFilter("Indexer", ["Indexer", "Encoder", "Indexer"])).toEqual(2)
    })

    const expectedFilters = [
      {
        filterLabel: "Executor type",
        values: [
          { name: "Classifier", selected: false, count: 0 },
          { name: "Evaluator", selected: false, count: 0 },
          { name: "Crafter", selected: false, count: 0 },
          { name: "Segementer", selected: false, count: 0 },
          { name: "Ranker", selected: false, count: 0 },
          { name: "Indexer", selected: false, count: 2 },
          { name: "Encoder", selected: true, count: 1 },
        ]
      },
      {
        filterLabel: "Domain space",
        values: [
          { name: "Text", selected: true, count: 2 },
          { name: "Audio", selected: false, count: 2 },
          { name: "Video", selected: false, count: 0 },
          { name: "Image", selected: false, count: 0 },
          { name: "Cross modal", selected: false, count: 0 },
          { name: "Multi modal", selected: false, count: 0 },
          { name: "PDF", selected: false, count: 1 },
        ]
      },
      {
        filterLabel: "Libraries",
        values: [
          { name: "Tensorflow", selected: false, count: 0 },
          { name: "Keras", selected: false, count: 0 },
          { name: "Numpy", selected: false, count: 0 },
          { name: "Pytorch", selected: false, count: 0 },
          { name: "Onnx", selected: false, count: 1 },
          { name: "Transformers", selected: false, count: 0 },
          { name: "sklearn", selected: false, count: 0 },
          { name: "PaddlePaddle", selected: false, count: 0 },
          { name: "librosa", selected: false, count: 0 },
          { name: "nltk", selected: false, count: 0 },
        ]
      },
      {
        filterLabel: "Language",
        values: [
          { name: "English", selected: false, count: 0 },
          { name: "Chinese", selected: false, count: 0 },
          { name: "Multilingual", selected: false, count: 0 },
        ]
      }
    ]

    it("gets filters from images", () => {
      expect(
        selectHubFilters({ hubState: { images: inputImages, selectedFilters: ["Text", "Encoder"] } } as State))
        .toEqual(expectedFilters)
    })
  })

  describe("selectHubImagesFetchError", () => {
    it("returns hubState error property", () => {
      const error = {
        name: "error name",
        message: "error message",
      }
      expect(selectHubImagesFetchError({ hubState: { error } } as State)).toBe(
        error
      )
      expect(
        selectHubImagesFetchError({ hubState: { error: null } } as State)
      ).toBe(null)
    })
  })
});
