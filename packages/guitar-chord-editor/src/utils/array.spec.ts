import { getArrayOfSize } from './array';

describe('getArrayOfSize()', () => {
  const tests: [size: number, expectedArray: number[]][] = [
    [0, []],
    [1, [0]],
    [10, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]],
  ];

  describe.each(tests)('when requested size is %s', (size, expectedArray) => {
    it('returns expected array', () => {
      expect(getArrayOfSize(size)).toEqual(expectedArray);
    });
  });
});
