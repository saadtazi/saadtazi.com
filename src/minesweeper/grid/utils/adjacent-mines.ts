import { getAdjacentCells } from "./adjacent-coordinates";
/**
 *
 * @param x x coordinate
 * @param y y coordinate
 * @param minePositions positions of the mines,
 *      as if cells were numbered from 0 to z,
 *      left to right, top to bottom
 * @returns number
 */
export const getAdjacentMines = (
  x: number,
  y: number,
  nbColumns: number,
  nbRows: number,
  minePositions: number[]
): number => {
  const toCheck = getAdjacentCells(x, y, nbColumns, nbRows);

  return toCheck.reduce((acc, v) => {
    return acc + (minePositions.includes(v) ? 1 : 0);
  }, 0);
};
