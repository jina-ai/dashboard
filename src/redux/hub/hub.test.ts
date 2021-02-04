import { fetchHubImages } from "./hub.actions";
import {
  initialHubState,
  FETCH_HUB_IMAGES,
  FETCH_HUB_IMAGES_SUCCESS,
  FETCH_HUB_IMAGES_FAILURE,
} from "./hub.constants";
import { HubState, HubActionTypes, HubImage } from "./hub.types";
import hubReducer from "./hub.reducer";
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
        { images: [], loading: true, error: null },
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
        { images: [], loading: true, error: null },
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
  it("sets state to loading on fetching images", () => {
    expect(
      hubReducer(
        { images: [], loading: true, error: null },
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
        { images: [], loading: true, error: null },
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
});
