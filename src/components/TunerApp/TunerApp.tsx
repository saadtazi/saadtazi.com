import {
  useCallback,
  useEffect,
  useState,
  useRef,
  useMemo,
  Fragment,
} from 'react';
import * as Tone from 'tone';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import { tunings } from './tunings';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { PitchDetector } from 'pitchy';
import { Gauge } from './Gauge';
import Slider from '@mui/material/Slider';
import useTranslate from 'hooks/translate';
import Stack from '@mui/material/Stack';

const ANALYSER_SIZE = 2048;

const getColor = (
  frequency: number,
  noteFrequency: number
): 'success' | 'secondary' | 'default' => {
  const isClose =
    frequency &&
    frequency > noteFrequency - 20 &&
    frequency < noteFrequency + 20;
  const doesMatch =
    frequency && frequency > noteFrequency - 1 && frequency < noteFrequency + 1;
  const color = doesMatch ? 'success' : isClose ? 'secondary' : 'default';
  return color;
};

export const TunerApp = () => {
  const t = useTranslate();

  const synth = useRef<Tone.Sampler | Tone.Synth>(undefined);
  const analyser = useRef<Tone.Waveform>(undefined);
  const requestAnimationRef = useRef<number>(undefined);
  const [started, setStarted] = useState(false);
  const [tuningPos, setTuningPos] = useState<string>('0');
  const [clarity, setClarity] = useState<number>(0.95);
  const [frequency, setFrequency] = useState<number | undefined>();
  const [closeNote, setCloseNote] = useState<string>();
  const pitchDetector = useRef<PitchDetector<Float32Array>>(undefined);
  const [errorMicrophone, setErrorMicrophone] = useState(false);
  const micOpenRef = useRef(false);

  const toggleStart = useCallback(async () => {
    if (!micOpenRef.current) {
      pitchDetector.current = PitchDetector.forFloat64Array(ANALYSER_SIZE);
      synth.current = new Tone.Synth().toDestination();

      analyser.current = new Tone.Waveform(ANALYSER_SIZE);
      micOpenRef.current = true;

      const mic = new Tone.UserMedia();
      mic
        .open()
        .then(() => {
          // to test with playable notes
          // synth.current!.connect(analyser.current!);
          mic.connect(analyser.current!);
        })
        .catch(() => {
          setErrorMicrophone(true);
        });
    }
    setStarted((v) => !v);
  }, [setStarted]);

  const play = useCallback((note: string) => {
    synth.current?.triggerAttackRelease(note, '8n');
  }, []);

  const notes = useMemo(
    () => tunings[parseInt(tuningPos, 10)]?.notes,
    [tuningPos]
  );

  const detectFrequency = useCallback(() => {
    const values = analyser.current?.getValue();
    const sampleRate = analyser.current?.context.sampleRate;
    if (values && sampleRate) {
      const [freq, freqClarity] = pitchDetector.current!.findPitch(
        values,
        sampleRate
      );
      if (freq > 0 && freqClarity > clarity) {
        setFrequency(freq);
        const newCloseNote = Tone.Frequency(freq).toNote();
        if (notes.includes(newCloseNote)) {
          setCloseNote(newCloseNote);
        }
      } else {
        setFrequency(undefined);
      }
    }
    requestAnimationRef.current = requestAnimationFrame(detectFrequency);
  }, [setFrequency, clarity, notes]);

  useEffect(() => {
    if (!started) {
      return;
    }
    requestAnimationRef.current = requestAnimationFrame(detectFrequency);
    return () => {
      requestAnimationRef.current &&
        cancelAnimationFrame(requestAnimationRef.current);
    };
  }, [started, detectFrequency]);

  const frequencies = useMemo(() => {
    if (!notes) {
      return [];
    }
    return notes.map((note) => Tone.Frequency(note).toFrequency());
  }, [notes]);

  const handleTuningPosChange = useCallback(
    (event: SelectChangeEvent) => {
      setTuningPos(event.target.value as string);
      if (notes) {
      }
      setCloseNote(notes[notes.length - 1]);
    },
    [setTuningPos, notes]
  );

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12 }} justifyContent="center" display="flex">
        <FormControl fullWidth>
          <InputLabel id="tuning-selector">{t('tuner.tuning')}</InputLabel>
          <Select
            labelId="tuning-selector"
            value={tuningPos}
            label={t('tuner.tuning')}
            onChange={handleTuningPosChange}
          >
            {tunings.map((tuning, index) => (
              <MenuItem key={`tuning-${index}`} value={index}>{`${
                tuning.instrument
              } - ${tuning.name} (${tuning.notes.join(' ')})`}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12 }} justifyContent="center" display="flex">
        <Typography>{t('tuner.frequencyClarity')}</Typography>
        <Slider
          getAriaLabel={() => 'Chord size (%)'}
          value={clarity}
          min={0.1}
          max={1}
          step={0.01}
          onChange={(_, value) => setClarity(value as number)}
          valueLabelDisplay="auto"
          getAriaValueText={() => `${clarity * 100}%`}
        />
      </Grid>
      <Grid size={{ xs: 12 }} justifyContent="center" display="flex">
        <Button onClick={toggleStart}>
          {started ? t('tuner.stop') : t('tuner.start')}
        </Button>
      </Grid>
      {!errorMicrophone && tuningPos && (
        <Grid size={{ xs: 12 }} justifyContent="center" display="flex">
          <Stack direction="row" spacing={2}>
            {tuningPos !== '' &&
              started &&
              notes?.map((note, index) => {
                const noteFrequency = frequencies[index];
                const noteFrequencyStr = noteFrequency?.toFixed(2);

                const color = getColor(frequency || 0, noteFrequency);

                return (
                  <Grid container key={note}>
                    <Grid
                      size={{ xs: 12 }}
                      justifyContent="center"
                      display="flex"
                      key={note}
                    >
                      <IconButton
                        color={color}
                        aria-label="play"
                        onClick={() => play(note)}
                        style={{
                          color: color === 'success' ? '#4ade80' : undefined,
                        }}
                      >
                        {note}
                      </IconButton>
                    </Grid>
                    <Grid
                      size={{ xs: 12 }}
                      justifyContent="center"
                      display="flex"
                      key={note}
                    >
                      <div style={{ fontSize: '0.7em' }}>
                        {noteFrequencyStr} Hz
                      </div>
                    </Grid>
                  </Grid>
                );
              })}
          </Stack>
        </Grid>
      )}
      {errorMicrophone && (
        <Grid size={{ xs: 12 }} justifyContent="center" display="flex">
          {t('tuner.microphoneError')}
        </Grid>
      )}
      {started && !errorMicrophone && (
        <>
          <Grid size={{ xs: 12 }} justifyContent="center" display="flex">
            <Gauge
              frequency={frequency}
              noteFrequency={Tone.Frequency(closeNote).toFrequency()}
            />
          </Grid>
          <Grid size={{ xs: 12 }} justifyContent="center" display="flex">
            <Typography variant="h3">{closeNote}</Typography>
          </Grid>
        </>
      )}
      {started && frequency && (
        <Grid size={{ xs: 12 }} justifyContent="center" display="flex">
          <Typography>
            {t('tuner.detectedFrequency')}: {frequency?.toFixed(2)} Hz
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};
