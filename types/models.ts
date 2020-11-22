export type ProjectLink = {
  name: string;
  url: string;
  icon?: 'github';
};
export type Project = {
  name: string;
  lead: string;
  features: string[];
  tags: string[];
  links: ProjectLink[];
};

export type Locale = 'en' | 'fr';
export type LocaleData = {
  [a: string]: {
    [k: string]: string;
  };
};
