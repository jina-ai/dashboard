import { fetchHubImages } from "./hub.actions";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const mockStore = configureMockStore([thunk]);

describe.skip("on fetching images", () => {
  it("dispatches FETCH_HUB_IMAGES_SUCCESS on successfull making network request", () => {
    const expectedActions = [{ type: "FETCH_HUB_IMAGES_SUCCESS", payload: {} }];

    const store = mockStore({ images: [] });

    return store.dispatch(fetchHubImages()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
