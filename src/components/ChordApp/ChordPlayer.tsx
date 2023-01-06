import { useCallback, useEffect, useState, useRef } from 'react';
import * as Tone from 'tone';
import {
  Chord,
  SelectedFrets,
  calculateFretNote,
  NoteWithLevel,
} from 'guitar-chord-editor';
import Button from '@mui/material/Button';
import { loadSampler } from './sampler';
import { Instrument } from './instruments';

type ChordPlayerProps = {
  instrument: Instrument;
  nbFrets?: number;
  position?: number;
  spaceAround?: number;
  stringSpacing?: number;
  fretSpacing?: number;
  stringStrokeWidth?: number;
  fretLinesStrokeWidth?: number;
  fingerRadius?: number;
  openStringSize?: number;
};

export const ChordPlayer = ({
  instrument,
  nbFrets = 6,
  ...rest
}: ChordPlayerProps) => {
  const { openChords, nbStrings } = instrument;
  // to prevent play() on instrument change
  const currentOpenChords = useRef(openChords);

  const [selected, setSelected] = useState<SelectedFrets>([]);
  const synth = useRef<Tone.Sampler>();

  const onChange = (newSelected: SelectedFrets) => {
    setSelected(newSelected);
  };

  useEffect(() => {
    (async () => {
      synth.current = await loadSampler();
    })();
  }, []);

  const play = useCallback(() => {
    const notes = selected
      .map((fretPosition, index) =>
        calculateFretNote(openChords[index], fretPosition)
      )
      .filter((v) => v !== undefined) as NoteWithLevel[];

    synth.current?.triggerAttackRelease(notes, 2);
  }, [selected, openChords]);

  useEffect(() => {
    if (currentOpenChords.current !== openChords) {
      currentOpenChords.current = openChords;
      return;
    }
    if (selected.length > 0) {
      play();
    }
  }, [play, openChords, selected]);

  useEffect(() => {
    setSelected([]);
  }, [openChords]);

  return (
    <>
      <Chord
        nbFrets={nbFrets}
        nbStrings={nbStrings}
        selected={selected}
        onChange={onChange}
        {...rest}
        editable={true}
      />
      <Button onClick={() => play()}>Play</Button>
    </>
  );
};
