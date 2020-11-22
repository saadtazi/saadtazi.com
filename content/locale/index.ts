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
