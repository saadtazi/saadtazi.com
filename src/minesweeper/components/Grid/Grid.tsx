import { Grid as GridType } from "minesweeper/grid/types";
import { Cell } from "minesweeper/components/Cell";
import { range } from "minesweeper/grid/utils";
import { MouseEvent } from "react";
import styles from "./Grid.module.css";

export type GridProps = GridType & {
  onCellClick: (x: number, y: number) => (evt: MouseEvent) => void;
  onRevealedClick: (x: number, y: number) => (evt?: MouseEvent) => void;
};

export function Grid({
  nbColumns,
  nbRows,
  cells,
  onCellClick,
  onRevealedClick,
}: GridProps) {
  const i = range(0, nbRows - 1);
  const j = range(0, nbColumns - 1);

  return (
    <div className={styles.grid}>
      {i.map((y) => (
        <div key={y} className={styles.row}>
          {j.map(
            (x) =>
              cells[y]?.[x] && (
                <Cell
                  key={`cell-${x}-${y}`}
                  className={styles.cell}
                  {...cells[y][x]}
                  onClick={onCellClick(x, y)}
                  onRevealedClick={onRevealedClick(x, y)}
                />
              )
          )}
        </div>
      ))}
    </div>
  );
}
