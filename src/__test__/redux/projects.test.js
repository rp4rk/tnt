import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import { localstorage } from 'middleware/localstorage';
import {
  GET_PROJECTS_START,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_FAILURE,
  SET_PROJECT_ALIAS,
  SET_ACTIVE_PROJECT
} from 'constants/actionTypes';
import {
  getProjectsStart,
  fetchProjects,
  setProjectAlias
} from 'actions/projects';
import { getProjectEndpoint } from 'constants/endpoints';

const middleware = [thunk, localstorage];
const mockStore = configureMockStore(middleware);

describe('Projects', () => {
  describe('GET', () => {
    beforeEach(() => {
      fetchMock.restore();
    });

    it('creates the correct action for getProjectsStart', () => {
      const expected = {
        type: GET_PROJECTS_START,
        payload: {
          loading: true
        },
        error: null
      };

      expect(getProjectsStart()).toEqual(expected);
    });

    it('creates GET_PROJECTS_SUCCESS when fetching projects has been done', async () => {
      const host = getProjectEndpoint('test');
      const body = {
        projects: [
          {
            id: 1,
            name: 'test'
          }
        ]
      };

      fetchMock.getOnce(host, {
        body,
        status: 200,
        headers: {
          'content-type': 'application/json'
        }
      });

      const store = mockStore({
        redmine: {
          key: 1,
          address: 'test'
        }
      });

      const expectedActions = [
        {
          type: GET_PROJECTS_START,
          payload: {
            loading: true
          },
          error: null
        },
        {
          type: GET_PROJECTS_SUCCESS,
          payload: {
            projects: body.projects,
            loading: false
          }
        },
        {
          type: SET_ACTIVE_PROJECT,
          payload: 1
        }
      ];

      await store.dispatch(fetchProjects());

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('creates GET_PROJECTS_FAILURE when fetching projects has failed', async () => {
      const host = getProjectEndpoint('test');

      fetchMock.getOnce(host, {
        body: {},
        headers: {
          'content-type': 'application/json'
        },
        status: 500
      });

      const store = mockStore({
        redmine: {
          key: 1,
          address: 'test'
        }
      });

      const expectedActions = [
        {
          type: GET_PROJECTS_START,
          payload: {
            loading: true
          },
          error: null
        },
        {
          type: GET_PROJECTS_FAILURE,
          error: 'Error: Failed to get a response from the server.',
          payload: {
            loading: false
          }
        }
      ];

      await store.dispatch(fetchProjects());

      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('aliases', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('sets and stores project aliases as expected', async () => {
      const store = mockStore({});

      const expectedActions = [
        {
          type: SET_PROJECT_ALIAS,
          payload: 'Test',
          meta: {
            id: 1,
            store: {
              key: 'PROJECT_ALIAS_1'
            }
          }
        }
      ];

      await store.dispatch(setProjectAlias(1, 'Test'));

      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
