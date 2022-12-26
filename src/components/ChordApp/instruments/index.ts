import { NoteWithLevel } from 'guitar-chord-editor';

export type Instrument = {
  nbStrings: number;
  openChords: NoteWithLevel[];
};

export type InstrumentKey = 'ukulele' | 'guitar';

export const instrumentsMap: Record<InstrumentKey, Instrument> = {
  ukulele: {
    nbStrings: 4,
    openChords: ['G4', 'C4', 'E4', 'A4'],
  },
  guitar: {
    nbStrings: 6,
    openChords: ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'],
  },
};
