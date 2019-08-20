import { SET_TUTORIAL_VIEWED } from 'constants/actionTypes';

export const setTutorialViewed = (tutorial, status) => ({
  type: SET_TUTORIAL_VIEWED,
  payload: status,
  meta: {
    id: tutorial,
    store: {
      key: `TUTORIAL_VIEWED_${tutorial}`
    }
  }
});
