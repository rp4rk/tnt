import { defaultTimeEntries } from '../../middleware/defaultTimeEntries';
import { GET_PROJECTS_SUCCESS } from '../../constants/actionTypes';

describe('defaultTimeEntries', () => {
  it('only accepts GET_PROJECTS_SUCCESS', () => {
    const dispatchMock = jest.fn();
    const middleware = defaultTimeEntries({})(dispatchMock);

    const mockAction = {
      type: 'TEST'
    };

    middleware(mockAction);

    expect(dispatchMock).toHaveBeenCalledWith(mockAction);
    expect(dispatchMock).toHaveBeenCalledTimes(1);
  });

  it('ignores GET_PROJECTS_SUCCESS actions without projects', () => {
    const dispatchMock = jest.fn();
    const middleware = defaultTimeEntries({})(dispatchMock);

    const mockAction = {
      type: GET_PROJECTS_SUCCESS,
      payload: {}
    };
    middleware(mockAction);

    expect(dispatchMock).toHaveBeenCalledWith(mockAction);
    expect(dispatchMock).toHaveBeenCalledTimes(1);
  });
});
