[guitar-chord-editor](README.md) / Exports

# guitar-chord-editor

## Table of contents

### Type Aliases

- [ANote](modules.md#anote)
- [Alteration](modules.md#alteration)
- [ChordProps](modules.md#chordprops)
- [Note](modules.md#note)
- [NoteWithLevel](modules.md#notewithlevel)
- [SelectedFrets](modules.md#selectedfrets)

### Functions

- [Chord](modules.md#chord)
- [calculateFretNote](modules.md#calculatefretnote)

## Type Aliases

### ANote

Ƭ **ANote**: ``"A"`` \| ``"B"`` \| ``"C"`` \| ``"D"`` \| ``"E"`` \| ``"F"`` \| ``"G"``

#### Defined in

[utils/notes.ts:1](https://github.com/saadtazi/saadtazi.com/blob/9de640e/packages/guitar-chord-editor/src/utils/notes.ts#L1)

___

### Alteration

Ƭ **Alteration**: ``"b"`` \| ``"#"`` \| ``""``

#### Defined in

[utils/notes.ts:2](https://github.com/saadtazi/saadtazi.com/blob/9de640e/packages/guitar-chord-editor/src/utils/notes.ts#L2)

___

### ChordProps

Ƭ **ChordProps**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `color?` | `string` | the line and text color of the chord. use any css color (default: `black`). |
| `editable?` | `boolean` | `true` if the chord is editable. Provide `onChange` prop is `true` |
| `fingerRadius?` | `number` | the "finger" radius |
| `fretLinesStrokeWidth?` | `number` | fret line stroke width |
| `fretSpacing?` | `number` | the space between 2 fret lines |
| `hoverColor?` | `string` | the color when an element is hovered (default: `rgba(0,0,0, 0.5)`) |
| `nbFrets` | `number` | the number of displayed frets |
| `nbStrings` | `number` | the number of chords on the instrument |
| `onChange?` | (`selectedCords`: [`SelectedFrets`](modules.md#selectedfrets)) => `void` | the function that will be called when the editable chord is modified |
| `openStringSize?` | `number` | the open string elemnent size ("square") |
| `position?` | `number` | the position of the top displayed fret (default: `0`) |
| `selected?` | [`SelectedFrets`](modules.md#selectedfrets) | the selected positions on each chords. `0` means an open chords, undefined means that chord is not played |
| `spaceAround?` | `number` | margin around the component |
| `stringSpacing?` | `number` | the space between 2 strings |
| `stringStrokeWidth?` | `number` | string stroke width |

#### Defined in

[components/Chord/Chord.tsx:8](https://github.com/saadtazi/saadtazi.com/blob/9de640e/packages/guitar-chord-editor/src/components/Chord/Chord.tsx#L8)

___

### Note

Ƭ **Note**: \`${ANote}${Alteration}\`

#### Defined in

[utils/notes.ts:3](https://github.com/saadtazi/saadtazi.com/blob/9de640e/packages/guitar-chord-editor/src/utils/notes.ts#L3)

___

### NoteWithLevel

Ƭ **NoteWithLevel**: \`${Note}${number}\`

#### Defined in

[utils/notes.ts:4](https://github.com/saadtazi/saadtazi.com/blob/9de640e/packages/guitar-chord-editor/src/utils/notes.ts#L4)

___

### SelectedFrets

Ƭ **SelectedFrets**: (`number` \| `undefined`)[]

#### Defined in

[components/Chord/Chord.tsx:6](https://github.com/saadtazi/saadtazi.com/blob/9de640e/packages/guitar-chord-editor/src/components/Chord/Chord.tsx#L6)

## Functions

### Chord

▸ **Chord**(`«destructured»`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`ChordProps`](modules.md#chordprops) |

#### Returns

`Element`

#### Defined in

[components/Chord/Chord.tsx:41](https://github.com/saadtazi/saadtazi.com/blob/9de640e/packages/guitar-chord-editor/src/components/Chord/Chord.tsx#L41)

___

### calculateFretNote

▸ **calculateFretNote**(`chordNoteWithLevel`, `position`): \`A${number}\` \| \`B${number}\` \| \`C${number}\` \| \`D${number}\` \| \`E${number}\` \| \`F${number}\` \| \`G${number}\` \| \`Ab${number}\` \| \`A#${number}\` \| \`Bb${number}\` \| \`B#${number}\` \| \`Cb${number}\` \| \`C#${number}\` \| \`Db${number}\` \| \`D#${number}\` \| \`Eb${number}\` \| \`E#${number}\` \| \`Fb${number}\` \| \`F#${number}\` \| \`Gb${number}\` \| \`G#${number}\`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chordNoteWithLevel` | \`A${number}\` \| \`B${number}\` \| \`C${number}\` \| \`D${number}\` \| \`E${number}\` \| \`F${number}\` \| \`G${number}\` \| \`Ab${number}\` \| \`A#${number}\` \| \`Bb${number}\` \| \`B#${number}\` \| \`Cb${number}\` \| \`C#${number}\` \| \`Db${number}\` \| \`D#${number}\` \| \`Eb${number}\` \| \`E#${number}\` \| \`Fb${number}\` \| \`F#${number}\` \| \`Gb${number}\` \| \`G#${number}\` |
| `position` | `number` |

#### Returns

\`A${number}\` \| \`B${number}\` \| \`C${number}\` \| \`D${number}\` \| \`E${number}\` \| \`F${number}\` \| \`G${number}\` \| \`Ab${number}\` \| \`A#${number}\` \| \`Bb${number}\` \| \`B#${number}\` \| \`Cb${number}\` \| \`C#${number}\` \| \`Db${number}\` \| \`D#${number}\` \| \`Eb${number}\` \| \`E#${number}\` \| \`Fb${number}\` \| \`F#${number}\` \| \`Gb${number}\` \| \`G#${number}\`

#### Defined in

[utils/notes.ts:35](https://github.com/saadtazi/saadtazi.com/blob/9de640e/packages/guitar-chord-editor/src/utils/notes.ts#L35)
