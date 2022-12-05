import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import React from "react";
import {
  useSpeechSynthesis,
  UseSpeechSynthesisReturnType,
} from "hooks/use-speech-synthesis";
import MicIcon from "@mui/icons-material/Mic";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import IconButton from "@mui/material/IconButton";
import { StyledRandomItem } from "./RandomStuff.styles";
import Tooltip from "@mui/material/Tooltip";
import useTranslate from "hooks/translate";
import * as gtag from "gtag";

function getVoiceLabel(voice: SpeechSynthesisVoice) {
  const label = `${voice.name} - ${voice.lang}`;
  return label;
}

const SpeechSynthesis: React.FC = () => {
  const t = useTranslate();
  const [value, setValue] = React.useState("");
  const [, setEnded] = React.useState(false);
  const [voice, setVoice] = React.useState<SpeechSynthesisVoice>();

  const onBoundary = (event: any) => {};
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

  const onPlayClick = () => {
    gtag.event({
      action: "click",
      category: "speechSynthesis",
      label: "activate speech synthesis",
    });
    speak({ text: value, voice: voice || voices[0] });
  };

  if (!supported) {
    return <>Speech is not supported. Upgrade your browser</>;
  }

  return (
    <StyledRandomItem>
      <div className="icon">
        <Tooltip placement="right" title={t("speechSynthesis.title")}>
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
                value={(voice && getVoiceLabel(voice)) || ""}
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
              label={t("speechSynthesis.textPlaceholder")}
              multiline
              maxRows={4}
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
              onClick={onPlayClick}
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
