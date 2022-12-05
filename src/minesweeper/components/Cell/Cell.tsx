import {
  Cell as CellAttributes,
  CellType,
  CellUserVisibility,
} from "minesweeper/grid/types";
import { MouseEvent } from "react";
import styles from "./Cell.module.css";

type CellProps = CellAttributes & {
  onClick: (evt: MouseEvent) => void;
  onRevealedClick: (evt?: MouseEvent) => void;
  className: string;
};

const getVisibilityIcon = (
  userVisibility: CellUserVisibility | undefined
): string => {
  if (!userVisibility || userVisibility === CellUserVisibility.DEFAULT) {
    return " ";
  } else {
    return "⛳️";
  }
};

export function Cell({
  type,
  userVisibility,
  adjacentMines,
  onClick,
  onRevealedClick,
  className,
}: CellProps) {
  if (
    !userVisibility ||
    [CellUserVisibility.DEFAULT, CellUserVisibility.FLAGGED].includes(
      userVisibility
    )
  ) {
    return (
      <div
        onClick={onClick}
        onContextMenu={onClick}
        className={[className, styles.cell, styles.notRevealed].join(" ")}
      >
        {getVisibilityIcon(userVisibility)}
      </div>
    );
  }

  if (type === CellType.MINE) {
    return (
      <div data-type={type} className={[className, styles.cell].join(" ")}>
        💣
      </div>
    );
  }

  // if (type === CellType.EMPTY)
  return (
    <div
      data-type={type}
      className={[className, styles.cell].join(" ")}
      onClick={onRevealedClick}
    >
      {adjacentMines === 0 ? " " : adjacentMines}
    </div>
  );
}
