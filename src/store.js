import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { reducers } from "./reducers";
import { localstorage } from "./middleware/localstorage";

const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducers,
  {},
  composer(applyMiddleware(thunk, localstorage))
);
