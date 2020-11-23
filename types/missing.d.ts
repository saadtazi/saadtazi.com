declare module 'react-recipes' {
  // speech recognition
  declare type UseSpeechRecognitionReturnType = {
    listen?: () => void;
    listening: boolean;
    stop?: () => void;
    supported: boolean;
  };

  declare type onResultType = (res: string[]) => void;
  declare type onEndType = () => void;

  export const useSpeechRecognition = (p: {
    onResult: onResultType;
    onEnd: onEndType;
  }) => UseSpeechRecognitionReturnType;

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
    onEnd: () => void;
    onBoundary: (event: any) => void;
    onError: (e?: Error) => void;
  };

  type UseSpeechSynthesisType = (
    p: UseSpeechSynthesisParam
  ) => UseSpeechSynthesisReturnType;
  export const useSpeechSynthesis = UseSpeechSynthesisType;
}
