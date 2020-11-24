import React from 'react';
import { useSpeechRecognition } from 'react-recipes';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import { StyledRandomItem } from './RandomStuff.styles';
import Tooltip from '@material-ui/core/Tooltip';
import useTranslate from 'hooks/translate';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import * as gtag from 'src/gtag';

const SpeechRecognition: React.FC = () => {
  const t = useTranslate();
  const [value, setValue] = React.useState('');
  const [ended, setEnded] = React.useState(false);
  const onResult = (result: string[]) => setValue(result.join(''));
  const onEnd = () => setEnded(true);
  const { listen, listening, stop, supported } = useSpeechRecognition({
    onEnd,
    onResult,
  });

  if (!supported) {
    return <>Speech Recognition is not supported. Upgrade your browser</>;
  }

  const onListen = () => {
    gtag.event({
      action: 'activate',
      category: 'SpeechRecognition',
      label: 'activate speech recognition',
    });
    listen({ lang: 'en-US', continuous: true });
  };

  return (
    <StyledRandomItem>
      <div className="icon">
        <Tooltip placement="right" title={t('speechRecognition.title')}>
          <RecordVoiceOverIcon />
        </Tooltip>
      </div>
      <div className="info">
        <div>
          <Button
            style={{ marginBottom: 8 }}
            onMouseDown={onListen}
            onMouseUp={stop}
          >
            {t('speechRecognition.activate')}
          </Button>
        </div>
        <div>
          <TextField
            label={t('speechRecognition.output')}
            multiline
            rowsMax={4}
            value={value}
            onChange={(event: any) => setValue(event.target.value)}
            variant="filled"
          />
        </div>
        {listening ? <div>Go ahead I'm listening...</div> : <div>&nbsp;</div>}
      </div>
    </StyledRandomItem>
  );
};

export default SpeechRecognition;
