import { localstorage } from 'middleware/localstorage';

describe('localstorage middleware', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('does not store without the store meta', () => {
    const dispatchMock = jest.fn();

    const middleware = localstorage({})(dispatchMock);

    middleware({
      type: 'TEST'
    });

    expect(dispatchMock).toHaveBeenCalled();
    expect(localStorage.getItem('TEST')).toBeNull();
  });

  it('stores with the key', () => {
    const dispatchMock = jest.fn();

    const middleware = localstorage({})(dispatchMock);

    middleware({
      type: 'TEST',
      payload: 'TEST_VALUE',
      meta: {
        store: {
          key: 'KEY_TEST'
        }
      }
    });

    expect(dispatchMock).toHaveBeenCalled();
    expect(localStorage.getItem('KEY_TEST')).toBe('TEST_VALUE');
  });

  it('falls back on the action type as a key', () => {
    const dispatchMock = jest.fn();

    const middleware = localstorage({})(dispatchMock);

    middleware({
      type: 'TEST',
      payload: 'TEST_VALUE',
      meta: {
        store: true
      }
    });

    expect(dispatchMock).toHaveBeenCalled();
    expect(localStorage.getItem('TEST')).toBe('TEST_VALUE');
  });
});
