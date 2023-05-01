import { LocaleData } from 'types/models';

export const fr: LocaleData = {
  home: 'accueil',
  stuff: 'trucs',
  hero: {
    hello: 'Bonjour, monde!',
    helloDescription:
      'Je suis un développeur de Montréal. Voici quelques projets personnels.',
  },
  battery: {
    chargeLevel: 'niveau',
    chargingTime: 'tempas de chargement',
    dischargingTime: 'temps de décharge',
  },
  motion: { acceleration: 'accélération', rotationRate: 'taux de rotation' },
  orientation: {
    title: 'orientation',
    angle: 'angle',
    isPrimary: 'principal?',
    primary: 'principal',
    secondary: 'secondaire',
  },
  windowSize: { widthAndHeight: 'largeur x hauteur (px)' },
  speechSynthesis: {
    title: 'synthèse vocale',
    textPlaceholder: 'Tapez quelque chose...',
  },
  speechRecognition: {
    title: 'reconnaissance vocale',
    activate: 'Appuyez et parlez...',
    output: 'Résultat',
  },
  murales: {
    navItem: 'murales',
    from: 'de {link}',
    by: 'de {artist}',
    mtlDonneesOuvertes: 'Montreal Données Ouvertes',
    mtlDonneesOuvertesLink:
      'https://donnees.montreal.ca/ville-de-montreal/murales',
  },
  minesweeper: {
    navItem: 'démineur',
    restart: 'Recommencer',
    'Identified/Total': 'Identifiées/Total',
    time: 'Temps',
    settings: 'Réglages',
    nbRows: 'Nombre de lignes',
    nbCols: 'Nombre de colonnes',
    nbMines: 'Nombre de mines',
    saveAndRestart: 'Sauvegarder et recommencer',
    flagbackToNormal: 'Cliquer pour revenir au mode normal ("f" to basculer)',
    clickToAddFlag:
      'Cliquer pour ajouter des drapeaux lorsque vous cliquer ("f" to basculer)',
    youWon: 'Gagné 🥳!',
    youLost: 'Perdu 😞...',
    close: 'Fermer',
  },
  chordPlayer: {
    title: 'Chord Player',
  },
  tuner: {
    title: 'Accordeur de Guitare/Ukelele',
    navItem: 'Accordeur',
    tuning: 'Accordage',
    frequencyClarity: 'Clarté/Sensibilité de la detection de fréquence',
    detectedFrequency: 'Fréquence Detectée',
    start: 'démarrer',
    stop: 'arrêter',
    microphoneError: 'Oops, je ne peux pas utiliser le microphone',
  },
  diffTools: {
    title: 'Outils Diff',
    enterText: 'json, url, query params, string...',
    inputType: 'type de données',
    autoType: 'auto',
    urlType: 'url',
    queryStringType: 'query string',
    jsonType: 'json',
    stringType: 'string (diff basique)',
    splitView: 'utiliser la vue séparée?',
  },
  cancel: 'Annuler',
  errors: {
    message404: 'NooOooOOooon... Nous sommes perdus.',
    backTo: "retour à l'accueil",
  },
  notFound: 'not found',
};
