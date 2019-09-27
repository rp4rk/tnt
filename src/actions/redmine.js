import {
  SET_REDMINE_ADDRESS,
  SET_REDMINE_KEY,
  GET_USER_START,
  GET_USER_SUCCESS,
  GET_USER_FAILURE
} from 'constants/actionTypes';
import { getCurrentUser } from 'constants/endpoints';
import { getRedmineAddress, getRedmineKey } from 'selectors/redmine';

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

export const getUser = () => ({
  type: GET_USER_START,
  payload: {
    loading: true
  },
  error: null
});

export const getUserSuccess = userId => ({
  type: GET_USER_SUCCESS,
  payload: {
    userId,
    loading: false
  },
  meta: {
    store: {
      key: 'userId'
    }
  }
});

export const getUserFailure = error => ({
  type: GET_USER_FAILURE,
  payload: {
    loading: false
  },
  error
});

export const fetchUserId = () => async (dispatch, getState) => {
  const state = getState();
  dispatch(getUser());
  const host = getRedmineAddress(state);
  const key = getRedmineKey(state);

  try {
    const userRequest = await fetch(getCurrentUser(host), {
      headers: {
        'X-Redmine-Api-Key': key,
        'content-type': 'application/json'
      }
    });
    const userResponse = await userRequest.json();

    dispatch(getUserSuccess(userResponse.user.id));
  } catch (error) {
    dispatch(getUserFailure(error));
  }
};
