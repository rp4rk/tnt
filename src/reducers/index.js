import { combineReducers } from "redux";

import redmine from "./redmine";
import projects from "./projects";
import entries from "./entries";

export const reducers = combineReducers({ redmine, projects, entries });
