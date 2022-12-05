import exp from "constants";
import { getAdjacentMines } from "./adjacent-mines";

describe("getAdjacentMines", () => {
  let nbColumns: number;
  let nbRows: number;
  let minePositions: number[];
  let expectedResults: number[][];

  describe("test 1", () => {
    nbColumns = 4;
    nbRows = 4;
    minePositions = [1, 5, 11];
    // => grid = [
    //   [0, 1, 0, 0],
    //   [0, 1, 0, 0],
    //   [0, 0, 0, 1],
    //   [0, 0, 0, 0],
    // ];

    expectedResults = [
      [2, 1, 2, 0],
      [2, 1, 3, 1],
      [1, 1, 2, 0],
      [0, 0, 1, 1],
    ];

    it("returns expected results", () => {
      for (let y = 0; y < nbRows; y++) {
        for (let x = 0; x < nbColumns; x++) {
          const res = getAdjacentMines(x, y, nbColumns, nbRows, minePositions);
          expect(res).toEqual(expectedResults[y][x]);
        }
      }
    });
  });

  describe("test 2", () => {
    nbColumns = 4;
    nbRows = 3;
    minePositions = [0, 1, 2, 4, 6, 8, 9, 10];
    // => grid = [
    //   [1, 1, 1, 0],
    //   [1, 0, 1, 0],
    //   [1, 1, 1, 0],
    // ];

    expectedResults = [
      [2, 4, 2, 2],
      [4, 8, 4, 3],
      [2, 4, 2, 2],
    ];

    it("returns expected results", () => {
      for (let y = 0; y < nbRows; y++) {
        for (let x = 0; x < nbColumns; x++) {
          const res = getAdjacentMines(x, y, nbColumns, nbRows, minePositions);
          expect(res).toEqual(expectedResults[y][x]);
        }
      }
    });
  });
});
