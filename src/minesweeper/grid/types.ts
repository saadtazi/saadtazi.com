export const enum CellType {
  MINE = "mine",
  EMPTY = "empty",
}

export const enum CellUserVisibility {
  DEFAULT = "default",
  FLAGGED = "flagged",
  REVEALED = "revealed",
}

export type Cell = {
  type: CellType;
  adjacentMines: number;
  userVisibility?: CellUserVisibility;
};

export type Grid = {
  nbRows: number;
  nbColumns: number;
  nbMines: number;
  cells: Cell[][];
};
