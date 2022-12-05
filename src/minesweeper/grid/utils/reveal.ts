import { Cell, CellUserVisibility, Grid } from "../types";
import { getAdjacentCoordinates } from "./adjacent-coordinates";
import { changeCellInGrid } from "./changes";

// recursive function
export const revealCellsAround = (grid: Grid, x: number, y: number): Grid => {
  let newGrid = grid;
  const cell = newGrid.cells[y][x];
  if (cell.adjacentMines !== 0) {
    return newGrid;
  }
  const adjacentCoordinates = getAdjacentCoordinates(
    x,
    y,
    newGrid.nbColumns,
    newGrid.nbRows
  ).filter(([x, y]) => {
    const cell: Cell | undefined = newGrid.cells[y]?.[x];
    return cell && cell.userVisibility === CellUserVisibility.DEFAULT;
  });
  for (let coordinate of adjacentCoordinates) {
    const adjacentX = coordinate[0];
    const adjacentY = coordinate[1];
    const adjacentCell = newGrid.cells[adjacentY]?.[adjacentX];

    if (
      !adjacentCell ||
      adjacentCell.userVisibility !== CellUserVisibility.DEFAULT
    ) {
      continue;
    }
    newGrid = changeCellInGrid(newGrid, adjacentX, adjacentY, {
      ...adjacentCell,
      userVisibility: CellUserVisibility.REVEALED,
    });
    if (
      adjacentCell.adjacentMines === 0 &&
      adjacentCell.userVisibility === CellUserVisibility.DEFAULT
    ) {
      const modGrid = revealCellsAround(newGrid, adjacentX, adjacentY);
      newGrid = modGrid;
    }
  }
  return newGrid;
};
