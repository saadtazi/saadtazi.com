import { useCallback, useEffect, useState, useRef, useMemo } from 'react';
import * as Tone from 'tone';
import Button from '@mui/material/Button';
import Grid from '@mui/system/Unstable_Grid';
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

const ANALYSER_SIZE = 2048;

export const TunerApp = () => {
  const t = useTranslate();

  const synth = useRef<Tone.Sampler | Tone.Synth>();
  const analyser = useRef<Tone.Waveform>();
  const requestAnimationRef = useRef<number>();
  const [started, setStarted] = useState(false);
  const [tuningPos, setTuningPos] = useState<string>('0');
  const [clarity, setClarity] = useState<number>(0.95);
  const [frequency, setFrequency] = useState<number | undefined>();
  const [closeNote, setCloseNote] = useState<string>();
  const pitchDetector = useRef<PitchDetector<Float32Array>>();
  const micOpenRef = useRef(false);

  const toggleStart = useCallback(async () => {
    if (!micOpenRef.current) {
      pitchDetector.current = PitchDetector.forFloat64Array(ANALYSER_SIZE);
      synth.current = new Tone.Synth().toDestination();

      analyser.current = new Tone.Waveform(ANALYSER_SIZE);
      micOpenRef.current = true;

      const mic = new Tone.UserMedia();
      mic.open().then(() => {
        // to test with playable notes
        // synth.current!.connect(analyser.current!);
        mic.connect(analyser.current!);
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
  }, [tuningPos]);

  const handleTuningPosChange = useCallback(
    (event: SelectChangeEvent) => {
      setTuningPos(event.target.value as string);
      if (notes) {
      }
      setCloseNote(notes[notes.length - 1]);
    },
    [setTuningPos]
  );

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid xs={12}>
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
      <Grid xs={12}>
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
        <Button onClick={toggleStart}>
          {started ? t('tuner.stop') : t('tuner.start')}
        </Button>
      </Grid>
      <Grid xs={12}>
        <Grid container justifyContent="center">
          {tuningPos !== '' &&
            started &&
            notes?.map((note, index) => {
              const noteFrequency = frequencies[index];
              const noteFrequencyStr = noteFrequency?.toFixed(2);
              const isClose =
                frequency &&
                frequency > noteFrequency - 20 &&
                frequency < noteFrequency + 20;
              const doesMatch =
                frequency &&
                frequency > noteFrequency - 1 &&
                frequency < noteFrequency + 1;
              const color = doesMatch
                ? 'success'
                : isClose
                ? 'secondary'
                : 'default';
              return (
                <Grid key={note}>
                  <IconButton
                    color={color}
                    aria-label="play"
                    onClick={() => play(note)}
                    style={{
                      color: color === 'secondary' ? '#4ade80' : 'inherit',
                    }}
                  >
                    {note}
                  </IconButton>
                  <div style={{ fontSize: '0.7em' }}>{noteFrequencyStr}</div>
                </Grid>
              );
            })}
        </Grid>
      </Grid>
      {started && closeNote && (
        <Grid xs={12}>
          <Grid container justifyContent="center">
            <Gauge
              frequency={frequency}
              note={closeNote}
              noteFrequency={Tone.Frequency(closeNote).toFrequency()}
            />
          </Grid>
        </Grid>
      )}
      {started && frequency && (
        <Grid xs={12}>
          <Grid container justifyContent="center">
            <Typography>
              {t('tuner.detectedFrequency')}: {frequency?.toFixed(2)} Hz
            </Typography>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};
