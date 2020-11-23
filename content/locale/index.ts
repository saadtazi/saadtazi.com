import { LocaleData, Locale, Project } from 'types/models';
import { en } from './en';
import { fr } from './fr';

import enProjects from './projects.en';
import frProjects from './projects.fr';

export type LocalesData = {
  [l in Locale]: LocaleData;
};

export const localesData: LocalesData = { en, fr };

export type ProjectsData = {
  [l in Locale]: Project[];
};
export const projects: ProjectsData = {
  en: enProjects,
  fr: frProjects,
};

type flattenedMessages = { [k: string]: string };

export function flattenMessages(
  nestedMessages: { [k: string]: string | any },
  prefix = ''
): flattenedMessages {
  return Object.keys(nestedMessages).reduce<flattenedMessages>(
    (messages, key) => {
      let value = nestedMessages[key];
      let prefixedKey = prefix ? `${prefix}.${key}` : key;

      if (typeof value === 'string') {
        messages[prefixedKey] = value;
      } else {
        Object.assign(messages, flattenMessages(value, prefixedKey));
      }

      return messages;
    },
    {}
  );
}
