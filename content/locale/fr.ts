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
  speechSyntesis: { title: 'synthèse vocale' },
  speechRecognition: { title: 'reconnaissance vocale' },
  errors: {
    message404: 'NooOooOOooon... Nous sommes perdus.',
    backTo: "retour à l'",
  },
};
