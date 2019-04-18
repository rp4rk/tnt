import { combineReducers } from "redux";

import redmine from "./redmine";
import projects from "./projects";

export const reducers = combineReducers({ redmine, projects });
