import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid2'; // Grid version 2
import { useState } from 'react';
import { ChordPlayer } from './ChordPlayer';
import { Chord } from 'guitar-chord-editor';
import { instrumentsMap, InstrumentKey } from './instruments';
import { Typography } from '@mui/material';

export const ChordApp = () => {
  const [selectedInstrument, setSelectedInstrument] =
    useState<InstrumentKey>('guitar');
  const [size, setSize] = useState(20);
  const [position, setPosition] = useState(1);
  const [spaceAround, setSpaceAround] = useState<number | undefined>(50);
  const [stringSpacing, setStringSpacing] = useState<number | undefined>(50);
  const [fretSpacing, setFretSpacing] = useState<number | undefined>(50);
  const [stringStrokeWidth, setStringStrokeWidth] = useState<
    number | undefined
  >(8);
  const [fretLinesStrokeWidth, setFretLinesStrokeWidth] = useState<
    number | undefined
  >(2);
  const [fingerRadius, setFingerRadius] = useState<number | undefined>(12);
  const [openStringSize, setOpenStringSize] = useState<number | undefined>(20);
  const [nbFrets, setNbFrets] = useState<number | undefined>(4);

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 3 }}>
        <TextField
          label={'Position'}
          fullWidth
          onChange={(evt) =>
            setPosition(parseInt(evt.currentTarget.value || '1', 10))
          }
          inputProps={{ type: 'number', min: 1, max: 16 }}
          value={position}
        />
      </Grid>

      <Grid size={{ xs: 3 }}>
        <TextField
          label={'Space Around'}
          fullWidth
          onChange={(evt) =>
            setSpaceAround(
              evt.currentTarget.value === ''
                ? undefined
                : parseInt(evt.currentTarget.value || '0', 10)
            )
          }
          inputProps={{ type: 'number', min: 1, max: 300 }}
          value={spaceAround === undefined ? '' : spaceAround}
        />
      </Grid>
      <Grid size={{ xs: 3 }}>
        <TextField
          label={'stringSpacing'}
          fullWidth
          onChange={(evt) =>
            setStringSpacing(
              evt.currentTarget.value === ''
                ? undefined
                : parseInt(evt.currentTarget.value || '0', 10)
            )
          }
          inputProps={{ type: 'number', min: 1, max: 300 }}
          value={stringSpacing === undefined ? '' : stringSpacing}
        />
      </Grid>
      <Grid size={{ xs: 3 }}>
        <TextField
          label={'fretSpacing'}
          fullWidth
          onChange={(evt) =>
            setFretSpacing(
              evt.currentTarget.value === ''
                ? undefined
                : parseInt(evt.currentTarget.value || '0', 10)
            )
          }
          inputProps={{ type: 'number', min: 1, max: 300 }}
          value={fretSpacing === undefined ? '' : fretSpacing}
        />
      </Grid>

      <Grid size={{ xs: 3 }}>
        <TextField
          label={'stringStrokeWidth'}
          fullWidth
          onChange={(evt) =>
            setStringStrokeWidth(
              evt.currentTarget.value === ''
                ? undefined
                : parseInt(evt.currentTarget.value || '0', 10)
            )
          }
          inputProps={{ type: 'number', min: 1, max: 300 }}
          value={stringStrokeWidth === undefined ? '' : stringStrokeWidth}
        />
      </Grid>

      <Grid size={{ xs: 3 }}>
        <TextField
          label={'fretLinesStrokeWidth'}
          fullWidth
          onChange={(evt) =>
            setFretLinesStrokeWidth(
              evt.currentTarget.value === ''
                ? undefined
                : parseInt(evt.currentTarget.value || '0', 10)
            )
          }
          inputProps={{ type: 'number', min: 1, max: 50 }}
          value={fretLinesStrokeWidth === undefined ? '' : fretLinesStrokeWidth}
        />
      </Grid>

      <Grid size={{ xs: 3 }}>
        <TextField
          label={'fingerRadius'}
          fullWidth
          onChange={(evt) =>
            setFingerRadius(
              evt.currentTarget.value === ''
                ? undefined
                : parseInt(evt.currentTarget.value || '0', 10)
            )
          }
          inputProps={{ type: 'number', min: 1, max: 50 }}
          value={fingerRadius === undefined ? '' : fingerRadius}
        />
      </Grid>

      <Grid size={{ xs: 3 }}>
        <TextField
          label={'openStringSize'}
          fullWidth
          onChange={(evt) =>
            setOpenStringSize(
              evt.currentTarget.value === ''
                ? undefined
                : parseInt(evt.currentTarget.value || '0', 10)
            )
          }
          inputProps={{ type: 'number', min: 1, max: 50 }}
          value={openStringSize === undefined ? '' : openStringSize}
        />
      </Grid>

      <Grid size={{ xs: 3 }}>
        <TextField
          label={'openStringSize'}
          fullWidth
          onChange={(evt) =>
            setOpenStringSize(
              evt.currentTarget.value === ''
                ? undefined
                : parseInt(evt.currentTarget.value || '0', 10)
            )
          }
          inputProps={{ type: 'number', min: 1, max: 50 }}
          value={openStringSize === undefined ? '' : openStringSize}
        />
      </Grid>

      <Grid size={{ xs: 6 }}>
        <TextField
          label={'nbFrets'}
          fullWidth
          onChange={(evt) =>
            setNbFrets(
              evt.currentTarget.value === ''
                ? undefined
                : parseInt(evt.currentTarget.value || '0', 10)
            )
          }
          inputProps={{ type: 'number', min: 1, max: 50 }}
          value={nbFrets === undefined ? '' : nbFrets}
        />
      </Grid>

      <Grid size={{ xs: 6 }}>
        <FormControl fullWidth>
          <InputLabel id="instrument-label">Instrument</InputLabel>
          <Select
            labelId="instrument-label"
            value={selectedInstrument}
            label="Instrument"
            onChange={(event) =>
              setSelectedInstrument(event.target.value as InstrumentKey)
            }
          >
            <MenuItem value={'guitar'}>Guitar</MenuItem>
            <MenuItem value={'ukulele'}>Ukulele</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Slider
          getAriaLabel={() => 'Chord size (%)'}
          value={size}
          min={10}
          max={100}
          onChange={(_, value) => setSize(value as number)}
          valueLabelDisplay="auto"
          getAriaValueText={() => `${size}%`}
        />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Typography variant="h4" align="center">
          Editable
        </Typography>
        <Container style={{ maxWidth: `${size}vw` }}>
          <ChordPlayer
            instrument={instrumentsMap[selectedInstrument]}
            nbFrets={nbFrets}
            position={position}
            spaceAround={spaceAround}
            stringSpacing={stringSpacing}
            fretSpacing={fretSpacing}
            stringStrokeWidth={stringStrokeWidth}
            fretLinesStrokeWidth={fretLinesStrokeWidth}
            fingerRadius={fingerRadius}
            openStringSize={openStringSize}
          />
        </Container>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Typography variant="h4" align="center">
          Read-only Examples
        </Typography>
        <Container style={{ maxWidth: `${size}vw` }}>
          <Chord
            nbFrets={4}
            nbStrings={6}
            selected={[1, 1, 3, 3, 2, 1]}
            editable={false}
          />
        </Container>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Container style={{ maxWidth: `${size}vw`, maxHeight: `${size}vh` }}>
          <Chord
            nbFrets={5}
            position={2}
            nbStrings={6}
            selected={[3, 3, 5, 5, 4, 3]}
            editable={false}
          />
        </Container>
      </Grid>
    </Grid>
  );
};
