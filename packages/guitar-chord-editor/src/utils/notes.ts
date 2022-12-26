export type ANote = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
export type Alteration = 'b' | '#' | '';
export type Note = `${ANote}${Alteration}`;
export type NoteWithLevel = `${Note}${number}`;

const allSharpedNotes = [
  'A',
  'A#',
  'B',
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
];
const allFlatNotes = [
  'Ab',
  'A',
  'Bb',
  'B',
  'C',
  'Db',
  'D',
  'Eb',
  'E',
  'F',
  'Fb',
  'G',
];

export const calculateFretNote = (
  chordNoteWithLevel: NoteWithLevel | undefined,
  position: number | undefined
): NoteWithLevel | undefined => {
  if (position === undefined) {
    return;
  }
  if (!chordNoteWithLevel || chordNoteWithLevel.length < 2) {
    return;
  }
  const chordNote =
    chordNoteWithLevel.length === 2
      ? chordNoteWithLevel[0]
      : chordNoteWithLevel.substring(0, 2);
  const noteLevelStr = chordNoteWithLevel.substring(
    chordNoteWithLevel.length - 1
  );
  let noteLevel = Number(noteLevelStr);

  // find which set of notes to use
  const notes = [allSharpedNotes, allFlatNotes].find((notes) =>
    notes.includes(chordNote)
  );

  if (notes === undefined) {
    return;
  }

  let notePos = notes.indexOf(chordNote);

  for (let i = 1; i <= position; i++) {
    notePos += 1;
    if (notePos >= notes.length) {
      notePos = 0;
    }
    if (notes[notePos] === 'C') {
      noteLevel += 1;
    }
  }
  return `${notes[notePos] as ANote}${noteLevel}`;
};
