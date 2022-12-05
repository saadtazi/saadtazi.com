export type coordinate = [x: number, y: number];

export const getAdjacentCoordinates = (
  x: number,
  y: number,
  nbColumns: number,
  nbRows: number
): coordinate[] => {
  const res: coordinate[] = [];
  // line above
  if (y - 1 >= 0) {
    // one cell above to the left
    if (x - 1 >= 0) {
      res.push([x - 1, y - 1]);
    }
    // one cell above
    res.push([x, y - 1]);

    // one cell above to the right
    if (x + 1 < nbColumns) {
      res.push([x + 1, y - 1]);
    }
  }
  // one cell to the left
  if (x - 1 >= 0) {
    res.push([x - 1, y]);
  }
  // one cell to the right
  if (x + 1 < nbColumns) {
    res.push([x + 1, y]);
  }
  // one line below
  if (y + 1 < nbRows) {
    // one cell above to the left
    if (x - 1 >= 0) {
      res.push([x - 1, y + 1]);
    }
    // one cell above
    res.push([x, y + 1]);
    // one cell above to the right
    if (x + 1 < nbColumns) {
      res.push([x + 1, y + 1]);
    }
  }
  return res;
};

/**
 * Given a x, y coordinate and the width, height of the grid,
 * returns a list of cell positions around the coordinate (cell numbered from 0 to z, left to right, top to bottom)
 */
export const getAdjacentCells = (
  x: number,
  y: number,
  nbColumns: number,
  nbRows: number
): number[] => {
  const adjacentCoordinates = getAdjacentCoordinates(x, y, nbColumns, nbRows);
  return adjacentCoordinates.map(
    (coordinate) => coordinate[0] + coordinate[1] * nbColumns
  );
};
