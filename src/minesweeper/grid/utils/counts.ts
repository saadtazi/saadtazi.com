import { Grid, CellUserVisibility } from "minesweeper/grid/types";

export const countCellOfUserVisibility = (
  grid: Grid,
  visibility: CellUserVisibility
): number => {
  let res = 0;
  for (let y = 0; y < grid.nbRows; y++) {
    for (let x = 0; x < grid.nbColumns; x++) {
      const cell = grid.cells[y]?.[x];
      if (cell && cell.userVisibility === visibility) {
        res += 1;
      }
    }
  }
  return res;
};
