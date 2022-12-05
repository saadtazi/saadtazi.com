// @ts-nocheck
// from https://github.com/craig1123/react-recipes/blob/master/src/useSpeechRecognition.js
// not installable with react 18
import { useRef, useEffect, useState, useCallback } from 'react';

// speech recognition
type UseSpeechRecognitionReturnType = {
  listen?: () => void;
  listening: boolean;
  stop?: () => void;
  supported: boolean;
};

declare type onResultType = (res: string[]) => void;
declare type onEndType = () => void;

type useSpeechRecognition = (p: {
  onResult: onResultType;
  onEnd: onEndType;
}) => UseSpeechRecognitionReturnType;

const isClient = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

// original idea/source https://github.com/MikeyParton/react-speech-kit/blob/master/src/useSpeechRecognition.js

// https://reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback
const useEventCallback = (fn, dependencies) => {
  const ref = useRef(() => {
    throw new Error('Cannot call an event handler while rendering.');
  });

  useEffect(() => {
    ref.current = fn;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fn, ...dependencies]);

  return useCallback(
    (args) => {
      const func = ref.current;
      return func(args);
    },
    [ref]
  );
};

if (isClient) {
  // @ts-expect-error might exist
  window.SpeechRecognition =
    // @ts-expect-error might exist
    window.SpeechRecognition || window.webkitSpeechRecognition;
}

const noop = () => {};

type useSpeechRecognitionParams = {
  onEnd?: () => void;
  onResult?: (result: string[]) => void;
  onError?: () => void;
};

const useSpeechRecognition = (props: useSpeechRecognitionParams = {}) => {
  const { onEnd = noop, onResult = noop, onError = noop } = props;
  const recognitionRef = useRef(null);
  const [listening, setListening] = useState(false);
  const supported =
    // @ts-expect-error might exist
    !!window.SpeechRecognition || !!window.webkitSpeechRecognition;

  const processResult = (event) => {
    const transcriptArray = Array.from(event.results)
      .map((result) => result[0])
      .map((result) => result.transcript);
    onResult(transcriptArray);
  };

  const handleError = (event) => {
    if (event.error === 'not-allowed') {
      recognitionRef.current.onend = () => {};
      setListening(false);
    }
    onError(event);
  };

  const listen = useEventCallback(
    (args = {}) => {
      if (listening || !supported) return;
      const {
        lang = '',
        interimResults = true,
        continuous = false,
        maxAlternatives = 1,
        grammars,
      } = args;
      setListening(true);
      recognitionRef.current.lang = lang;
      recognitionRef.current.interimResults = interimResults;
      recognitionRef.current.onresult = processResult;
      recognitionRef.current.onerror = handleError;
      recognitionRef.current.continuous = continuous;
      recognitionRef.current.maxAlternatives = maxAlternatives;
      if (grammars) {
        recognitionRef.current.grammars = grammars;
      }
      // SpeechRecognition stops automatically after inactivity
      // We want it to keep going until we tell it to stop
      recognitionRef.current.onend = () => recognitionRef.current.start();
      recognitionRef.current.start();
    },
    [listening, supported, recognitionRef]
  );

  const stop = useEventCallback(() => {
    if (!listening || !supported) return;
    recognitionRef.current.onresult = () => {};
    recognitionRef.current.onend = () => {};
    recognitionRef.current.onerror = () => {};
    setListening(false);
    recognitionRef.current.stop();
    onEnd();
  }, [listening, supported, recognitionRef, onEnd]);

  useEffect(() => {
    if (!supported) return;

    recognitionRef.current = new window.SpeechRecognition();
  }, [supported]);

  return {
    listen,
    listening,
    stop,
    supported,
  };
};

export default useSpeechRecognition;
