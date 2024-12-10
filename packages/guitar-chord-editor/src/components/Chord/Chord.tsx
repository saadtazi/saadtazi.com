import { Fragment } from 'react';
import { OpenString } from './OpenString';
import { Point } from './Point';
import { getArrayOfSize } from '../../utils';

export type SelectedFrets = (number | undefined)[];

export type ChordProps = {
  /** the number of chords on the instrument */
  nbStrings: number;
  /** the number of displayed frets */
  nbFrets: number;
  /** the selected positions on each chords. `0` means an open chords, undefined means that chord is not played */
  selected?: SelectedFrets;
  /** the line and text color of the chord. use any css color (default: `black`). */
  color?: string;
  /** the color when an element is hovered (default: `rgba(0,0,0, 0.5)`) */
  hoverColor?: string;
  /** the position of the top displayed fret (default: `0`) */
  position?: number;
  /** margin around the component */
  spaceAround?: number;
  /**the space between 2 strings */
  stringSpacing?: number;
  /**the space between 2 fret lines */
  fretSpacing?: number;
  /** string stroke width */
  stringStrokeWidth?: number;
  /** fret line stroke width */
  fretLinesStrokeWidth?: number;
  /** the "finger" radius */
  fingerRadius?: number;
  /** the open string elemnent size ("square") */
  openStringSize?: number;
  /** `true` if the chord is editable. Provide `onChange` prop is `true` */
  editable?: boolean;
  /** the function that will be called when the editable chord is modified */
  onChange?: (selectedCords: SelectedFrets) => void;
};

export const Chord = ({
  nbStrings: nbStrings = 4,
  nbFrets = 4,
  position = 1,
  selected = [],
  color = 'black',
  hoverColor = 'rgba(0,0,0, 0.5)',
  onChange,
  spaceAround = 50,
  stringSpacing: chordSpacing = 50,
  fretSpacing = 50,
  stringStrokeWidth: chordStrokeWidth = 8,
  fretLinesStrokeWidth = 2,
  fingerRadius = 15,
  openStringSize = 20,
  editable = false,
}: ChordProps) => {
  // make sure the array is of the right size, to prevent empty
  const selectedFrets = getArrayOfSize(nbStrings).map((v) => {
    return selected[v] === undefined ? undefined : selected[v];
  });
  const width = (nbStrings - 1) * chordSpacing + spaceAround * 2;
  const height = nbFrets * fretSpacing + spaceAround * 2;

  const onPositionClicked =
    (chord: number) => (fret: number | undefined) => () => {
      if (!editable) {
        return;
      }
      const newValue = selected[chord] === fret ? 0 : fret;
      onChange?.(
        [
          ...selectedFrets.slice(0, chord),
          newValue,
          ...selectedFrets.slice(chord + 1),
        ].map((v) => (v === undefined ? undefined : v))
      );
    };

  return (
    <svg viewBox={`0 0 ${width} ${height}`}>
      {position > 1 && (
        <text
          aria-label="position"
          x={spaceAround / 2 - openStringSize / 2}
          y={spaceAround + openStringSize + fretSpacing / 2}
        >
          {position}
        </text>
      )}
      {/* strings */}
      {getArrayOfSize(nbStrings).map((chord) => {
        return (
          <g key={chord}>
            <OpenString
              aria-label="open-string"
              x={spaceAround + chord * chordSpacing - openStringSize / 2}
              y={spaceAround - fretLinesStrokeWidth / 2 - openStringSize / 2}
              size={openStringSize}
              selectedColor={color}
              hoverColor={hoverColor}
              unselectedColor={'transparent'}
              strokeWidth={3}
              position={position}
              selected={selectedFrets[chord]}
              onChange={(v) => onChange && onPositionClicked(chord)(v)()}
              editable={editable}
            />
            <line
              aria-label="string"
              key={chord}
              x1={spaceAround + chord * chordSpacing}
              y1={
                spaceAround +
                openStringSize -
                fretLinesStrokeWidth / 2 -
                (position === 1 ? fretLinesStrokeWidth * 2 : 0)
              }
              x2={spaceAround + chord * chordSpacing}
              y2={
                spaceAround +
                openStringSize +
                nbFrets * fretSpacing +
                fretLinesStrokeWidth / 2
              }
              stroke={color}
              strokeWidth={chordStrokeWidth}
            />

            {/* clickable points */}
            {getArrayOfSize(nbFrets).map((f) => {
              return (
                <Point
                  key={f}
                  cx={spaceAround + chord * chordSpacing}
                  cy={
                    spaceAround +
                    openStringSize -
                    fretLinesStrokeWidth / 2 +
                    fretSpacing / 2 +
                    fretSpacing * f
                  }
                  r={fingerRadius}
                  fillColor={color}
                  hoverColor={hoverColor}
                  selected={selectedFrets[chord] === f + position}
                  onClick={onPositionClicked(chord)(f + position)}
                  editable={editable}
                />
              );
            })}
          </g>
        );
      })}
      {/* frets */}
      {Array.from(Array(nbFrets + 1).keys()).map((fret) => {
        return (
          <g key={fret}>
            {position === 1 && fret === 0 && (
              <line
                aria-label="first-fret-line"
                x1={spaceAround}
                y1={
                  spaceAround +
                  openStringSize +
                  fret * fretSpacing -
                  fretLinesStrokeWidth * 2
                }
                x2={spaceAround + (nbStrings - 1) * chordSpacing}
                y2={
                  spaceAround +
                  openStringSize +
                  fret * fretSpacing -
                  fretLinesStrokeWidth * 2
                }
                stroke={color}
                strokeWidth={fretLinesStrokeWidth}
              />
            )}
            <line
              aria-label="fret-line"
              x1={spaceAround}
              y1={spaceAround + openStringSize + fret * fretSpacing}
              x2={spaceAround + (nbStrings - 1) * chordSpacing}
              y2={spaceAround + openStringSize + fret * fretSpacing}
              stroke={color}
              strokeWidth={fretLinesStrokeWidth}
            />
          </g>
        );
      })}
    </svg>
  );
};
