import { combineReducers } from "redux";

import redmine from "./redmine";
import projects from "./projects";
import entries from "./entries";
import entryposts from "./entryposts";

export const reducers = combineReducers({
  redmine,
  projects,
  entries,
  entryposts
});
