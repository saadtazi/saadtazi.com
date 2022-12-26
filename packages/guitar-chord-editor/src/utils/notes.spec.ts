import { calculateFretNote, NoteWithLevel } from './notes';

describe('calculateFretNote()', () => {
  const tests: [
    description: string,
    openStringNote: NoteWithLevel,
    position: number | undefined,
    expectedNote: NoteWithLevel | undefined
  ][] = [
    ['undefined position', 'A2', undefined, undefined],
    ['position is 0', 'A2', 0, 'A2'],
    ['position adds a sharp', 'A2', 1, 'A#2'],
    ['position is after C', 'A2', 4, 'C#3'],
    ['position changes octave', 'A2', 12, 'A3'],
  ];

  describe.each(tests)(
    'when %s',
    (_, openStringNote, position, expectedNote) => {
      it('should return expected note', () => {
        expect(calculateFretNote(openStringNote, position)).toEqual(
          expectedNote
        );
      });
    }
  );
});
