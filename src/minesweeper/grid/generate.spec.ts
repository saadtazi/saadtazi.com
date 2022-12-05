import { generate } from "./generate";
import { CellType, CellUserVisibility, Grid } from "./types";
import { randomSort } from "./utils/random-sort";

jest.mock("./utils/random-sort");

describe("grid/generate", () => {
  describe("if nbColumns is negative", () => {
    it("throws an error", () => {
      expect(() => {
        generate(-10, 10, 10);
      }).toThrowError("`nbColumns` should be positive");
    });
  });

  describe("if nbRows is negative", () => {
    it("throws an error", () => {
      expect(() => {
        generate(10, -10, 10);
      }).toThrowError("`nbRows` should be positive");
    });
  });

  describe("if the requested grid cannot contain all the mines", () => {
    it("throws an error", () => {
      expect(() => {
        generate(10, 10, 100);
      }).toThrowError("not enough cells to place the mines");
    });
  });

  const expectedGrid = {
    nbColumns: 4,
    nbRows: 3,
    nbMines: 4,
    cells: [
      // row 1
      [
        {
          type: CellType.MINE,
          adjacentMines: 3,
          userVisibility: CellUserVisibility.DEFAULT,
        },
        {
          type: CellType.MINE,
          adjacentMines: 3,
          userVisibility: CellUserVisibility.DEFAULT,
        },
        {
          type: CellType.EMPTY,
          adjacentMines: 2,
          userVisibility: CellUserVisibility.DEFAULT,
        },
        {
          type: CellType.EMPTY,
          adjacentMines: 0,
          userVisibility: CellUserVisibility.DEFAULT,
        },
      ],
      // row 2
      [
        {
          type: CellType.MINE,
          adjacentMines: 3,
          userVisibility: CellUserVisibility.DEFAULT,
        },
        {
          type: CellType.MINE,
          adjacentMines: 3,
          userVisibility: CellUserVisibility.DEFAULT,
        },
        {
          type: CellType.EMPTY,
          adjacentMines: 2,
          userVisibility: CellUserVisibility.DEFAULT,
        },
        {
          type: CellType.EMPTY,
          adjacentMines: 0,
          userVisibility: CellUserVisibility.DEFAULT,
        },
      ],
      // row 3
      [
        {
          type: CellType.EMPTY,
          adjacentMines: 2,
          userVisibility: CellUserVisibility.DEFAULT,
        },
        {
          type: CellType.EMPTY,
          adjacentMines: 2,
          userVisibility: CellUserVisibility.DEFAULT,
        },
        {
          type: CellType.EMPTY,
          adjacentMines: 1,
          userVisibility: CellUserVisibility.DEFAULT,
        },
        {
          type: CellType.EMPTY,
          adjacentMines: 0,
          userVisibility: CellUserVisibility.DEFAULT,
        },
      ],
    ],
  };

  describe("when providing the mine positions", () => {
    let grid: Grid;

    beforeEach(() => {
      // nbMines param is ignored if minePositions is provided
      grid = generate(4, 3, 3, [0, 1, 4, 5]);
      // [
      //   [1, 1, 0, 0],
      //   [1, 1, 0, 0],
      //   [0, 0, 0, 0],
      // ]
    });

    it("generates the proper grid data", () => {
      expect(grid).toEqual(expectedGrid);
    });
  });

  describe("when not providing the mine positions", () => {
    let grid: Grid;

    beforeEach(() => {
      jest.mocked(randomSort).mockReturnValue([0, 1, 4, 5, 100, 1000]);
      // nbMines param is ignored if minePositions is provided
      grid = generate(4, 3, 4);
    });

    it("generates the proper grid data", () => {
      expect(grid).toEqual(expectedGrid);
    });
  });
});
