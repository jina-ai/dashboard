import { fetchHubImages } from "./hub.actions";
import { initialHubState } from "./hub.constants";
import { HubState } from "./hub.types";
import configureMockStore from "redux-mock-store";
import thunk, { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { State } from "../index";

const mockAxios = new MockAdapter(axios);

type DispatchExts = ThunkDispatch<State, void, AnyAction>;
const mockStore = configureMockStore<HubState, DispatchExts>([thunk]);

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
