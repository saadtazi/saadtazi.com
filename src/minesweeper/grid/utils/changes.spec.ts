import { changeCellInGrid, changeCellInRow } from "./changes";

import { Cell, CellType, Grid } from "../types";
import { generate } from "../generate";

describe("changeCellInRow", () => {
  let grid: Grid;
  let changedRow: Cell[];
  let changedCell: Cell;

  beforeEach(() => {
    grid = generate(3, 4, 2);
    changedCell = { type: CellType.EMPTY, adjacentMines: 0 };
    changedRow = changeCellInRow(grid.cells[1], 1, changedCell);
  });

  it("modifies one cell in row", () => {
    expect(changedRow[1]).toEqual(changedCell);
  });

  it("does not modify other cells", () => {
    expect(changedRow[0]).toBe(grid.cells[1][0]);
    expect(changedRow[2]).toBe(grid.cells[1][2]);
  });
});

describe("changeCellInGrid", () => {
  let grid: Grid;
  let changedGrid: Grid;
  let changedCell: Cell;

  beforeEach(() => {
    grid = generate(3, 4, 2);
    changedCell = { type: CellType.EMPTY, adjacentMines: 0 };
    changedGrid = changeCellInGrid(grid, 1, 1, changedCell);
  });

  it("modifies one cell in grid", () => {
    expect(changedGrid.cells[1][1]).toEqual(changedCell);
  });

  it("does not modify other cells", () => {
    expect(changedGrid.cells[0][1]).toBe(grid.cells[0][1]);
    expect(changedGrid.cells[1][0]).toBe(grid.cells[1][0]);
  });
});
