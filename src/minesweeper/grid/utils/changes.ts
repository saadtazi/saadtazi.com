import { Cell, Grid } from "minesweeper/grid/types";

export const changeCellInGrid = (
  grid: Grid,
  x: number,
  y: number,
  newCell: Cell
): Grid => {
  return {
    ...grid,
    cells: [
      ...grid.cells.slice(0, y),
      changeCellInRow(grid.cells[y], x, newCell),
      ...grid.cells.slice(y + 1, grid.nbRows),
    ],
  };
};

export const changeCellInRow = (
  row: Cell[],
  x: number,
  newCell: Cell
): Cell[] => {
  return [...row.slice(0, x), newCell, ...row.slice(x + 1, row.length)];
};
