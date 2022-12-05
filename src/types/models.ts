import { Point, Feature } from 'geojson';

export type ProjectLink = {
  name: string;
  url: string;
  icon?: 'github';
};
export type Project = {
  name: string;
  lead: string;
  features?: string[];
  tags: string[];
  links: ProjectLink[];
};

export type Locale = 'en' | 'fr';
export type LocaleData = {
  [a: string]: string | LocaleData;
};

export type Murale = {
  address?: string;
  year?: string;
  artist?: string;
  borough?: string;
  image?: string;
  lat: number;
  lng: number;
};

type MuraleGeoJSONProperties = {
  artiste?: string;
  annee?: string;
  arrondissement?: string;
  adresse?: string;
  image?: string;
  latitude: number;
  longitude: number;
};

export type MuraleGeoJSON = Feature<Point, MuraleGeoJSONProperties>;
