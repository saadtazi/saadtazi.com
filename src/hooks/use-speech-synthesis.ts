// @ts-nocheck
import { useCallback, useEffect, useState } from 'react';

// speech synthesis
export type UseSpeechSynthesisReturnType = {
  cancel: () => void;
  speak: (p: { text: string; voice: SpeechSynthesisVoice }) => void;
  speaking: boolean;
  supported: boolean;
  voices: SpeechSynthesisVoice[];
  pause: () => void;
  resume: () => void;
};

declare type UseSpeechSynthesisParam = {
  onBoundary: (event: any) => void;
  onEnd?: () => void;
  onError?: (e?: Error) => void;
  onPause?: (e?: Error) => void;
  onResume?: (e?: Error) => void;
};

type UseSpeechSynthesisType = (
  p: UseSpeechSynthesisParam
) => UseSpeechSynthesisReturnType;

// original idea/source https://github.com/MikeyParton/react-speech-kit/blob/master/src/useSpeechSynthesis.jsx

const noop = () => {};

export const useSpeechSynthesis = (props: UseSpeechSynthesisParam) => {
  const {
    onBoundary,
    onEnd = noop,
    onError = noop,
    onPause = noop,
    onResume = noop,
  } = props;
  const [voices, setVoices] = useState([]);
  const [speaking, setSpeaking] = useState(false);
  const supported = !!window.speechSynthesis;

  const processVoices = useCallback((voiceOptions) => {
    setVoices(voiceOptions);
  }, []);

  const getVoices = useCallback(() => {
    // Firefox seems to have voices upfront and never calls the
    // voiceschanged event
    let voiceOptions = window.speechSynthesis.getVoices();
    if (voiceOptions.length > 0) {
      processVoices(voiceOptions);
      return;
    }

    window.speechSynthesis.onvoiceschanged = (event) => {
      voiceOptions = event.target.getVoices();
      processVoices(voiceOptions);
    };
  }, [processVoices]);

  const handleEnd = () => {
    setSpeaking(false);
    onEnd();
  };

  const handleError = (e) => {
    setSpeaking(false);
    onError(e);
  };

  const speak = (args = {}) => {
    const {
      voice = null,
      text = '',
      rate = 1,
      pitch = 1,
      volume = 1,
      lang = 'en-US',
      continuous = false,
    } = args;
    if (!supported) return;
    window.speechSynthesis.cancel();
    const utterance = new window.SpeechSynthesisUtterance();
    // Firefox won't repeat an utterance that has been
    // spoken, so we need to create a new instance each time
    utterance.lang = lang;
    utterance.text = text;
    utterance.voice = voice;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;
    utterance.continuous = continuous;
    utterance.onend = handleEnd;
    utterance.onerror = handleError;
    utterance.onpause = onPause;
    utterance.onresume = onResume;
    if (onBoundary) {
      utterance.onboundary = onBoundary;
    }
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  };

  const pause = () => {
    if (speaking && supported) {
      window.speechSynthesis.pause();
      setSpeaking(false);
    }
  };

  const resume = () => {
    if (!speaking && supported) {
      window.speechSynthesis.resume();
      setSpeaking(true);
    }
  };

  const cancel = () => {
    if (!supported) return;
    setSpeaking(false);
    window.speechSynthesis.cancel();
  };

  useEffect(() => {
    if (supported) {
      getVoices();
    }
    return () => {
      if (supported) {
        window.speechSynthesis.cancel();
      }
    };
  }, [supported, getVoices]);

  return {
    supported,
    speak,
    speaking,
    voices,
    cancel,
    pause,
    resume,
  };
};
