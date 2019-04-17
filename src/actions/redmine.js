import { SET_REDMINE_ADDRESS, SET_REDMINE_KEY } from "../constants/actionTypes";

export const setRedmineAddress = address => ({
  type: SET_REDMINE_ADDRESS,
  payload: address
});

export const setRedmineKey = key => ({
  type: SET_REDMINE_KEY,
  payload: key
});
