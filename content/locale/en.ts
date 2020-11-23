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
  speechSyntesis: { title: 'speech synthesis' },
  speechRecognition: { title: 'speech recognition' },
  errors: { message404: "NooOooOOooo... We're lost.", backTo: 'back to' },
};
