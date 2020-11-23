import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import {
  useSpeechSynthesis,
  UseSpeechSynthesisReturnType,
} from 'react-recipes';
import MicIcon from '@material-ui/icons/Mic';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import IconButton from '@material-ui/core/IconButton';
import { StyledRandomItem } from './RandomStuff.styles';
import Tooltip from '@material-ui/core/Tooltip';
import useTranslate from 'hooks/translate';

function getVoiceLabel(voice: SpeechSynthesisVoice) {
  const label = `${voice.name} - ${voice.lang}`;
  return label;
}

const SpeechSynthesis: React.FC = () => {
  const t = useTranslate();
  const [value, setValue] = React.useState('');
  const [, setEnded] = React.useState(false);
  const [voice, setVoice] = React.useState<SpeechSynthesisVoice>();
  const onBoundary = (event: any) => {
    // console.log(
    //   `${event.name} boundary reached after ${event.elapsedTime} milliseconds.`
    // );
  };
  const onEnd = () => setEnded(true);
  const onError = (event: any) => {
    console.warn(event);
  };

  const {
    cancel,
    speak,
    speaking,
    voices,
    pause,
    resume,
    supported,
  }: UseSpeechSynthesisReturnType = useSpeechSynthesis({
    onEnd,
    onBoundary,
    onError,
  });

  const sortedVoices = voices.sort((v1, v2) => (v1.lang > v2.lang ? 1 : -1));

  const voicesMapping = voices.reduce<{ [k: string]: SpeechSynthesisVoice }>(
    (acc, voice) => {
      acc[getVoiceLabel(voice)] = voice;
      return acc;
    },
    {}
  );

  if (!supported) {
    return <>Speech is not supported. Upgrade your browser</>;
  }

  return (
    <StyledRandomItem>
      <div className="icon">
        <Tooltip placement="right" title={t('speechSyntesis.title')}>
          <MicIcon />
        </Tooltip>
      </div>
      <div className="info">
        <div>
          <div>
            <FormControl style={{ marginBottom: 8 }}>
              <InputLabel id="demo-simple-select-label">Voice</InputLabel>

              <Select
                style={{ minWidth: 120 }}
                labelId="voice-label"
                id="voice-select"
                value={(voice && getVoiceLabel(voice)) || ''}
                onChange={(e) =>
                  setVoice(voicesMapping[e.target.value as number])
                }
              >
                {sortedVoices.map(
                  (voice: SpeechSynthesisVoice, index: number) => {
                    return (
                      <MenuItem key={voice.name} value={getVoiceLabel(voice)}>
                        {getVoiceLabel(voice)}
                      </MenuItem>
                    );
                  }
                )}
              </Select>
            </FormControl>
          </div>
          <div>
            <TextField
              label="Type some text..."
              multiline
              rowsMax={4}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              variant="filled"
            />
          </div>
          <div>
            <IconButton type="button" onClick={cancel}>
              <SkipPreviousIcon />
            </IconButton>
            <IconButton
              disabled={!voice || !value}
              type="button"
              onClick={() => speak({ text: value, voice: voice || voices[0] })}
            >
              <PlayArrowIcon />
            </IconButton>
            <IconButton
              disabled={!voice || !value}
              type="button"
              onClick={() => (speaking ? pause() : resume())}
            >
              <PauseIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </StyledRandomItem>
  );
};

export default SpeechSynthesis;
