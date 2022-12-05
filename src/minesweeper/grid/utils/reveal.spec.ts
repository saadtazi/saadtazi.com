import { generate } from "../generate";
import { CellType, CellUserVisibility, Grid } from "../types";
import { revealCellsAround } from "./reveal";

describe("revealCellsAround", () => {
  let grid: Grid;
  let revealedGrid: Grid;

  beforeEach(() => {
    grid = generate(4, 4, 1, [4]);
    /*
    [
        [1 1 0 0]
        [x 1 0 0]
        [1 1 0 0]
        [0 0 0 0]
    ]
    */
    revealedGrid = revealCellsAround(grid, 3, 0);
  });
  it("reveals cells around", () => {
    expect(revealedGrid.cells).toEqual([
      // row 0
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
        {
          type: CellType.EMPTY,
          adjacentMines: 0,
          userVisibility: CellUserVisibility.REVEALED,
        },
        {
          type: CellType.EMPTY,
          adjacentMines: 0,
          userVisibility: CellUserVisibility.REVEALED,
        },
      ],
      // row 1
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
        {
          type: CellType.EMPTY,
          adjacentMines: 0,
          userVisibility: CellUserVisibility.REVEALED,
        },
        {
          type: CellType.EMPTY,
          adjacentMines: 0,
          userVisibility: CellUserVisibility.REVEALED,
        },
      ],
      // row 2
      [
        {
          type: CellType.EMPTY,
          adjacentMines: 1,
          userVisibility: CellUserVisibility.REVEALED,
        },
        {
          type: CellType.EMPTY,
          adjacentMines: 1,
          userVisibility: CellUserVisibility.REVEALED,
        },
        {
          type: CellType.EMPTY,
          adjacentMines: 0,
          userVisibility: CellUserVisibility.REVEALED,
        },
        {
          type: CellType.EMPTY,
          adjacentMines: 0,
          userVisibility: CellUserVisibility.REVEALED,
        },
      ],
      // row 3
      [
        {
          type: CellType.EMPTY,
          adjacentMines: 0,
          userVisibility: CellUserVisibility.REVEALED,
        },
        {
          type: CellType.EMPTY,
          adjacentMines: 0,
          userVisibility: CellUserVisibility.REVEALED,
        },
        {
          type: CellType.EMPTY,
          adjacentMines: 0,
          userVisibility: CellUserVisibility.REVEALED,
        },
        {
          type: CellType.EMPTY,
          adjacentMines: 0,
          userVisibility: CellUserVisibility.REVEALED,
        },
      ],
    ]);
  });
});
