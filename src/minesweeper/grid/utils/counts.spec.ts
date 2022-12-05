import { generate } from "../generate";
import { CellType, CellUserVisibility, Grid } from "../types";
import { countCellOfUserVisibility } from "./counts";

describe("countCellOfUserVisibility", () => {
  let grid: Grid;

  describe("with a new grid", () => {
    beforeEach(() => {
      grid = generate(2, 2, 1);
    });

    it("has no revealed cell", () => {
      expect(
        countCellOfUserVisibility(grid, CellUserVisibility.REVEALED)
      ).toEqual(0);
    });

    it("has only default visibility cells", () => {
      expect(
        countCellOfUserVisibility(grid, CellUserVisibility.DEFAULT)
      ).toEqual(4);
    });
  });

  describe("with a grid with some revealed cells", () => {
    beforeEach(() => {
      grid = {
        nbColumns: 2,
        nbRows: 2,
        nbMines: 1,
        cells: [
          [
            {
              type: CellType.MINE,
              adjacentMines: 0,
              userVisibility: CellUserVisibility.DEFAULT,
            },
            {
              type: CellType.EMPTY,
              adjacentMines: 1,
              userVisibility: CellUserVisibility.REVEALED,
            },
          ],
          [
            {
              type: CellType.EMPTY,
              adjacentMines: 1,
              userVisibility: CellUserVisibility.DEFAULT,
            },
            {
              type: CellType.EMPTY,
              adjacentMines: 1,
              userVisibility: CellUserVisibility.REVEALED,
            },
          ],
        ],
      };
    });

    it("has some revealed cells", () => {
      expect(
        countCellOfUserVisibility(grid, CellUserVisibility.REVEALED)
      ).toEqual(2);
    });

    it("has some visible cells", () => {
      expect(
        countCellOfUserVisibility(grid, CellUserVisibility.DEFAULT)
      ).toEqual(2);
    });
  });
});
