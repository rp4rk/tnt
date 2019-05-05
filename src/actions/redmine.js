import { SET_REDMINE_ADDRESS, SET_REDMINE_KEY } from '../constants/actionTypes';

export const setRedmineAddress = address => ({
  type: SET_REDMINE_ADDRESS,
  payload: address,
  meta: {
    store: {
      key: 'redmineAddress'
    }
  }
});

export const setRedmineKey = key => ({
  type: SET_REDMINE_KEY,
  payload: key,
  meta: {
    store: {
      key: 'redmineKey'
    }
  }
});
