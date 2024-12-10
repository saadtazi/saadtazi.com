import { useRouter } from 'next/router';
import { Grid } from 'minesweeper/components/Grid';
import {
  Grid as GridType,
  Cell,
  CellUserVisibility,
  CellType,
} from 'minesweeper/grid/types';
import { generate } from 'minesweeper/grid/generate';
import {
  countCellOfUserVisibility,
  changeCellInGrid,
  revealCellsAround,
} from 'minesweeper/grid/utils';
import { MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { getAdjacentCoordinates } from 'minesweeper/grid/utils/adjacent-coordinates';
import { SettingsDialog } from 'minesweeper/components/Settings';
import {
  saveSettings,
  fetchSettings,
  SettingsType,
} from 'minesweeper/settings';
import Button from '@mui/material/Button';
import MuiGrid from '@mui/material/Grid2';

import { Win } from 'minesweeper/components/Win';
import { Lose } from 'minesweeper/components/Lose';
import { FlagMode } from 'minesweeper/components/FlagMode';
import { Timer } from 'minesweeper/components/Timer';
import useTranslate from 'hooks/translate';

const enum GameStatus {
  READY = 'READY',
  STOPPED = 'STOPPED',
  STARTED = 'STARTED',
  WIN = 'WIN',
  LOST = 'LOST',
}

export function MineSweeper() {
  const [settings, setSettings] = useState<SettingsType>(fetchSettings());
  const [grid, setGrid] = useState<GridType | undefined>(undefined);
  const [gameStatus, setGameStatus] = useState(GameStatus.STOPPED);
  const [flagMode, setFlagMode] = useState(false);
  const router = useRouter();
  const t = useTranslate();

  const [nbFlagged, setNbFlagged] = useState(0);

  const toggleFlagMode = useCallback(
    () => setFlagMode((prevFlagMode) => !prevFlagMode),
    [setFlagMode]
  );
  // calculate nbRevealed
  const nbRevealed = useMemo(() => {
    if (!grid) {
      return 0;
    }
    return countCellOfUserVisibility(grid, CellUserVisibility.REVEALED);
  }, [grid]);

  const restart = useCallback(
    (newSettings: SettingsType = settings) => {
      setNbFlagged(0);
      setGrid(
        generate(newSettings.nbColumns, newSettings.nbRows, newSettings.nbMines)
      );
      setGameStatus(GameStatus.READY);
    },
    [settings, setNbFlagged, setGrid, setGameStatus]
  );

  const revealAll = () => {
    if (!grid) {
      return;
    }
    let newGrid = grid;
    for (let y = 0; y < grid.nbRows; y++) {
      for (let x = 0; x < grid.nbColumns; x++) {
        newGrid = changeCellInGrid(newGrid, x, y, {
          ...grid.cells[y][x],
          userVisibility: CellUserVisibility.REVEALED,
        });
      }
    }
    setGrid(newGrid);
  };

  const changeVisibility = (
    x: number,
    y: number,
    newCellUserVisibility: CellUserVisibility,
    shouldRevealCellsAround: boolean
  ) => {
    if (![GameStatus.STARTED, GameStatus.READY].includes(gameStatus)) {
      return;
    }
    // start timer
    if (gameStatus === GameStatus.READY) {
      setGameStatus(GameStatus.STARTED);
    }
    const cell = grid?.cells[y]?.[x];
    if (cell && cell.userVisibility !== newCellUserVisibility) {
      // CHANGE VISIBILITY of x, y
      setGrid((oldGrid) => {
        if (!oldGrid) {
          return oldGrid;
        }
        let newGrid = changeCellInGrid(oldGrid, x, y, {
          ...cell,
          userVisibility: newCellUserVisibility,
        });
        // clicked on a mine! 💥
        if (
          newCellUserVisibility === CellUserVisibility.REVEALED &&
          cell.type === CellType.MINE
        ) {
          setGameStatus(() => {
            return GameStatus.LOST;
          });
          return newGrid;
        }
        // clicked on revealed cell: reveal adjacent cells
        // TODO(saad) - optimize
        if (
          newCellUserVisibility === CellUserVisibility.REVEALED &&
          shouldRevealCellsAround
        ) {
          const modGrid = revealCellsAround(newGrid, x, y);
          newGrid = modGrid;
        }
        return newGrid;
      });
    }
  };

  const onCellClick = (x: number, y: number) => (evt?: MouseEvent) => {
    evt?.preventDefault();
    const cell = grid?.cells[y]?.[x];
    if (!cell) {
      return;
    }
    if (evt?.type === 'contextmenu' || flagMode) {
      if (cell.userVisibility === CellUserVisibility.FLAGGED) {
        setNbFlagged((prevNbFlagged) => prevNbFlagged - 1);
        changeVisibility(x, y, CellUserVisibility.DEFAULT, false);
        return;
      }

      if (
        !cell.userVisibility ||
        cell.userVisibility === CellUserVisibility.DEFAULT
      ) {
        setNbFlagged((prevNbFlagged) => prevNbFlagged + 1);
        changeVisibility(x, y, CellUserVisibility.FLAGGED, false);
        return;
      }
    }

    // when flagged cell clicked, just remove the flag
    if (cell.userVisibility === CellUserVisibility.FLAGGED) {
      setNbFlagged((prevNbFlagged) => prevNbFlagged - 1);
      changeVisibility(x, y, CellUserVisibility.DEFAULT, false);
      return;
    }
    // regular click
    changeVisibility(x, y, CellUserVisibility.REVEALED, true);
  };

  const onRevealedClick = (x: number, y: number) => () => {
    if (!grid || flagMode) {
      return;
    }
    const adjacentCoordinates = getAdjacentCoordinates(
      x,
      y,
      grid.nbColumns,
      grid.nbRows
    );
    const nbFlags = adjacentCoordinates.filter(([x, y]) => {
      const cell: Cell | undefined = grid.cells[y]?.[x];
      return cell && cell.userVisibility === CellUserVisibility.FLAGGED;
    }).length;
    const clickedCell = grid.cells[y]?.[x];

    if (nbFlags > 0 && clickedCell && clickedCell.adjacentMines === nbFlags) {
      const toUpdate = adjacentCoordinates.filter(([x, y]) => {
        const cell: Cell | undefined = grid.cells[y]?.[x];
        return (
          (cell && cell.userVisibility === CellUserVisibility.DEFAULT) ||
          !cell.userVisibility
        );
      });

      toUpdate.forEach(([adjacentX, adjacentY]) => {
        onCellClick(adjacentX, adjacentY)();
      });
    }
  };

  useEffect(() => {
    if (!grid) {
      return;
    }
    if (nbRevealed + grid.nbMines === grid.nbColumns * grid.nbRows) {
      setGameStatus(GameStatus.WIN);
    }
  }, [nbRevealed, grid]);

  // restart if settings change
  useEffect(() => restart(settings), [settings, restart]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key == 'f') {
        toggleFlagMode();
      }
    },
    [toggleFlagMode]
  );

  useEffect(() => {
    window.document.addEventListener('keydown', onKeyDown);
    return () => window.document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  const onSettingsChange = (settings: SettingsType) => {
    saveSettings(settings);
    setSettings(settings);
  };

  // start the game (timer)
  const onGameClick = () => {
    if (gameStatus === GameStatus.STOPPED) {
      setGameStatus(GameStatus.STARTED);
    }
  };

  if (!grid) {
    return null;
  }

  return (
    <div onClick={onGameClick}>
      {gameStatus === GameStatus.WIN && (
        <Win restart={() => restart(settings)} />
      )}
      {gameStatus === GameStatus.LOST && (
        <Lose restart={() => restart(settings)} />
      )}
      <MuiGrid container spacing={2}>
        <MuiGrid>
          <SettingsDialog settings={settings} onSubmit={onSettingsChange} />
        </MuiGrid>
        <MuiGrid>
          <Button onClick={() => restart(settings)}>
            {t('minesweeper.restart')}
          </Button>
        </MuiGrid>
      </MuiGrid>
      <MuiGrid container spacing={2}>
        <MuiGrid size={{ xs: 12, sm: 2 }}>
          <FlagMode toggle={toggleFlagMode} flagMode={flagMode} />
        </MuiGrid>
        <MuiGrid size={{ xs: 6, sm: 5 }}>
          <h3>
            {t('minesweeper.Identified/Total')}: {nbFlagged}/{grid.nbMines}
          </h3>
        </MuiGrid>
        <MuiGrid size={{ xs: 12, sm: 5 }} offset={{ xs: 'auto' }}>
          <Timer
            action={
              gameStatus === GameStatus.STARTED
                ? 'start'
                : gameStatus === GameStatus.READY
                ? 'ready'
                : 'stop'
            }
          />
        </MuiGrid>
      </MuiGrid>

      {router.query.cheat && (
        <Button onClick={revealAll}>Reveal all (😈)</Button>
      )}
      <Grid
        {...grid}
        onCellClick={onCellClick}
        onRevealedClick={onRevealedClick}
      />
    </div>
  );
}
