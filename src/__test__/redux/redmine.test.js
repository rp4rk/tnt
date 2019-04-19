import configureMockStore from "redux-mock-store";

import { localstorage } from "../../middleware/localstorage";
import { setRedmineAddress, setRedmineKey } from "../../actions/redmine";
import {
  SET_REDMINE_ADDRESS,
  SET_REDMINE_KEY
} from "../../constants/actionTypes";

const middlewares = [localstorage];
const mockStore = configureMockStore(middlewares);

describe("Redmine", () => {
  beforeEach(() => localStorage.clear());

  it("sets and stores an api key correctly", async () => {
    const store = mockStore();
    const expectedActions = [
      {
        type: SET_REDMINE_KEY,
        payload: "key",
        meta: { store: { key: "redmineKey" } }
      }
    ];

    await store.dispatch(setRedmineKey("key"));

    expect(store.getActions()).toEqual(expectedActions);
    expect(localStorage.getItem("redmineKey")).toBe("key");
  });

  it("sets and stores an address correctly", async () => {
    const store = mockStore();
    const expectedActions = [
      {
        type: SET_REDMINE_ADDRESS,
        payload: "https://www.google.com",
        meta: { store: { key: "redmineAddress" } }
      }
    ];

    await store.dispatch(setRedmineAddress("https://www.google.com"));

    expect(store.getActions()).toEqual(expectedActions);
    expect(localStorage.getItem("redmineAddress")).toBe(
      "https://www.google.com"
    );
  });
});
