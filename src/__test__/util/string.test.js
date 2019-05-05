import { containsString } from 'util/string';

describe('string utilities', () => {
  it('returns true if the initial string has an instance of the latter string', () => {
    expect(containsString('test', 'TEST')).toBeTruthy();
  });

  it('returns false if an instance of the latter string cannot be found', () => {
    expect(containsString('test1', 'test2')).toBeFalsy();
  });
});
