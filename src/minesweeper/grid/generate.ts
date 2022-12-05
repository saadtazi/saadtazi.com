import { Grid, Cell, CellType, CellUserVisibility } from "./types";
import { getAdjacentMines, randomSort, range } from "./utils";

/**
 *
 * @param nbColumns number of columns
 * @param nbRows number of rows
 * @param nbMines ignored if fixedMinePositions is provided
 * @param fixedMinePositions a list of mine positions (numbered from left to right, top to bottom)
 * @returns
 */
export const generate = (
  nbColumns: number,
  nbRows: number,
  nbMines: number,
  fixedMinePositions?: number[]
): Grid => {
  if (nbColumns < 0) {
    throw new Error("`nbColumns` should be positive");
  }
  if (nbRows < 0) {
    throw new Error("`nbRows` should be positive");
  }
  if (nbMines >= nbColumns * nbRows) {
    throw new Error("not enough cells to place the mines");
  }
  const minePositions =
    fixedMinePositions ||
    randomSort(range(0, nbColumns * nbRows - 1)).slice(0, nbMines);

  const cells: Cell[][] = [];

  for (let y = 0; y < nbRows; y++) {
    const row: Cell[] = [];
    for (let x = 0; x < nbColumns; x++) {
      const cell: Cell = {
        type: minePositions.includes(x + y * nbColumns)
          ? CellType.MINE
          : CellType.EMPTY,
        adjacentMines: getAdjacentMines(x, y, nbColumns, nbRows, minePositions),
        userVisibility: CellUserVisibility.DEFAULT,
      };
      row.push(cell);
    }
    cells.push(row);
  }

  return {
    nbRows,
    nbColumns,
    nbMines: minePositions.length,
    cells,
  };
};
