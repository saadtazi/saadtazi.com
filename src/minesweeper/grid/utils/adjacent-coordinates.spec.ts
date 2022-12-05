import { getAdjacentCoordinates, coordinate } from "./adjacent-coordinates";

describe("getAdjacentCoordinates", () => {
  const testCases: [
    description: string,
    x: number,
    y: number,
    expected: coordinate[]
  ][] = [
    [
      "top left corner",
      0,
      0,
      [
        [1, 0],
        [0, 1],
        [1, 1],
      ],
    ],
    [
      "top row",
      0,
      1,
      [
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 2],
        [1, 2],
      ],
    ],
    [
      "bottom right corner",
      2,
      3,
      [
        [1, 2],
        [2, 2],
        [1, 3],
      ],
    ],
    [
      "the middle",
      1,
      1,
      [
        [0, 0],
        [1, 0],
        [2, 0],
        [0, 1],
        [2, 1],
        [0, 2],
        [1, 2],
        [2, 2],
      ],
    ],
  ];
  describe.each(testCases)(`when in %s`, (_, x, y, expected) => {
    it("returns proper adjcent coordinates", () => {
      expect(getAdjacentCoordinates(x, y, 3, 4)).toEqual(expected);
    });
  });
});

// [      0 1 2
//     0 [x x x],
//     1 [x x x],
//     2 [x x x],
//     3 [x x x],
// ]
