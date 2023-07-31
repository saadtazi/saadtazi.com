import { LocaleData } from 'types/models';

export const en: LocaleData = {
  home: 'home',
  stuff: 'stuff',
  hero: {
    hello: 'Hello, world!',
    helloDescription:
      'I am a full stack developer from Montreal. Check out some of my personal projects below.',
  },
  battery: {
    chargeLevel: 'level',
    chargingTime: 'charging time',
    dischargingTime: 'discharging time',
  },
  motion: { acceleration: 'acceleration', rotationRate: 'rotation rate' },
  orientation: {
    title: 'orientation',
    angle: 'angle',
    isPrimary: 'is primary?',
    primary: 'primary',
    secondary: 'secondary',
  },
  windowSize: { widthAndHeight: 'width x height (px)' },
  speechSynthesis: {
    title: 'speech synthesis',
    textPlaceholder: 'type some text...',
  },
  speechRecognition: {
    title: 'speech recognition',
    activate: 'Press and talk...',
    output: 'Output',
  },
  murales: {
    navItem: 'murals',
    from: 'from {link}',
    by: 'by {artist}',
    mtlDonneesOuvertes: 'Montreal Données Ouvertes',
    mtlDonneesOuvertesLink:
      'https://donnees.montreal.ca/ville-de-montreal/murales',
  },
  minesweeper: {
    navItem: 'mine sweeper',
    restart: 'Restart',
    'Identified/Total': 'Identified/Total',
    time: 'Time',
    settings: 'settings',
    nbRows: 'Number of Rows',
    nbCols: 'Number of Columns',
    nbMines: 'Number of mines',
    saveAndRestart: 'Save and Restart',
    flagbackToNormal: 'click to switch back to normal (press "f" to toggle)',
    clickToAddFlag:
      'click to add flag when clicking/tapping a cell (press "f" to toggle)',
    youWon: 'You won 🥳!',
    youLost: 'You lost 😞...',
    close: 'Close',
  },
  chordPlayer: {
    title: 'Chord Player',
  },
  tuner: {
    title: 'Guitar/Ukelele Tuner',
    navItem: 'Tuner',
    tuning: 'tuning',
    frequencyClarity: 'Frequency Clarity/Sensitivity',
    detectedFrequency: 'Detected Frequency',
    start: 'start',
    stop: 'stop',
    microphoneError: "Oops, I cannot use your device's microphone",
  },
  diffTools: {
    title: 'Diff Tools',
    enterText: 'enter json, url, query params...',
    inputType: 'input type',
    copyUrl: 'copy url',
    autoType: 'auto',
    urlType: 'url',
    queryStringType: 'query string',
    jsonType: 'json',
    stringType: 'string (basic diff)',
    splitView: 'use split view?',
  },
  cancel: 'cancel',
  errors: { message404: "NooOooOOooo... We're lost.", backTo: 'back to' },
  notFound: 'not found',
};
