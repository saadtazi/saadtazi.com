'use client';

import { DndContext, DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { HanoiTowerId } from './models';
import { TowerElement } from './TowerElement';
import { useEffect, useId, useState } from 'react';
import { useHanoiTower } from './use-hanoi-tower';
import { Tower } from './Tower';
import { Button, Card, CardContent, TextField } from '@mui/material';
import Slider from '@mui/material/Slider';
import Grid from '@mui/material/Grid2';
import useTranslate from 'hooks/translate';

import {
  DISK_COUNT,
  DISK_HEIGHT,
  DISK_MIN_WIDTH,
  DISK_SIZE_STEP,
} from './constant';

export default function HanoiTower() {
  const [scale, setScale] = useState(1);
  const [nbDisksField, setNbDisksField] = useState(DISK_COUNT);
  const t = useTranslate();
  const {
    nbDisks,
    nbMoves,
    towers,
    canAddElement,
    onElementDragEnd,
    canAddDraggedElement,
    onElementDragStart,
    reset,
  } = useHanoiTower(DISK_COUNT);
  const dndId = useId();

  useEffect(() => {
    setNbDisksField(nbDisks);
  }, [nbDisks, setNbDisksField]);

  function handleDragEnd(event: DragEndEvent) {
    const elementId = event.active.id as string;
    const destinationTowerId = event.over?.id as HanoiTowerId | undefined;

    onElementDragEnd(elementId, destinationTowerId);
  }

  function handleDragStart(event: DragStartEvent) {
    onElementDragStart(event.active.id as string);
  }

  const towerWidth = DISK_MIN_WIDTH + nbDisks * DISK_SIZE_STEP;

  return (
    <>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          {t('hanoiTower.nbMoves')}: {nbMoves}
        </Grid>
        <Grid size={{ xs: 6 }}>
          {t('hanoiTower.gameSize')}
          <Slider
            getAriaLabel={() => 'game size'}
            value={scale}
            min={0.5}
            max={1}
            step={0.01}
            onChange={(_, value) => {
              setScale(value as number);
            }}
            valueLabelDisplay="auto"
            getAriaValueText={() => `${scale * 100}%`}
          />
        </Grid>
        <Grid size={{ xs: 7 }}>
          <TextField
            fullWidth
            label={t('hanoiTower.nbDisks')}
            onChange={(evt) => {
              const value = Math.max(
                3,
                Math.min(9, parseInt(evt.currentTarget.value || '1', 10))
              );
              setNbDisksField(value);
            }}
            inputProps={{ type: 'number', min: 3, max: 9 }}
            value={nbDisksField}
          />
          <Button
            onClick={() => {
              reset(nbDisksField);
            }}
          >
            Reset
          </Button>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Card style={{ backgroundColor: 'transparent' }}>
            <CardContent>
              <DndContext
                id={dndId}
                onDragEnd={handleDragEnd}
                onDragStart={handleDragStart}
              >
                <div
                  style={{
                    scale: `${scale}`,
                    boxSizing: 'content-box',
                    display: 'grid',
                    gridTemplateColumns: `${towerWidth}px ${towerWidth}px ${towerWidth}px`,
                    columnGap: DISK_MIN_WIDTH,
                    justifyItems: 'center',
                    alignItems: 'center',
                  }}
                >
                  {Object.entries(towers).map(([hanoiTtowerId, elements]) => {
                    const towerId = hanoiTtowerId as HanoiTowerId;

                    // to avoid errors when reducing the number of disks
                    const emptyElements = Array(
                      Math.max(0, nbDisks - elements.length)
                    )
                      .fill(null)
                      .map((_, index) => {
                        return (
                          <div
                            key={`empty-${index}`}
                            style={{ height: DISK_HEIGHT }}
                          ></div>
                        );
                      });
                    const canDrag = canAddDraggedElement(towerId);
                    return (
                      <div key={towerId}>
                        <Tower
                          id={towerId}
                          disabled={!canDrag}
                          nbDisks={nbDisks}
                        >
                          {emptyElements}
                          {elements.map((element) => {
                            const isFirstElement =
                              element.id === elements[0].id;
                            const canBeDropped = Object.keys(towers).some(
                              (towerId) =>
                                canAddElement(towerId as HanoiTowerId, element)
                            );

                            return (
                              <TowerElement
                                scale={scale}
                                key={element.id}
                                length={element.length}
                                disabled={!isFirstElement || !canBeDropped}
                                id={element.id}
                              >
                                {element.length}
                              </TowerElement>
                            );
                          })}
                        </Tower>
                      </div>
                    );
                  })}
                </div>
              </DndContext>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
