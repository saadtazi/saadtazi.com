import { Murale } from 'types/models';
import { MuraleGeoJSON } from 'types/models';
import { LatLngExpression } from 'leaflet';

export const fromFeature = (geoJsonFeature: MuraleGeoJSON): Murale => {
  const {
    artiste: artist,
    annee: year,
    arrondissement: borough,
    adresse: address,
    image,
    latitude: lat,
    longitude: lng,
  } = geoJsonFeature.properties;

  return {
    artist,
    year,
    address,
    borough,
    image,
    lat,
    lng,
  };
};

export const getCenter = (murale: Murale): LatLngExpression => {
  return [murale.lat, murale.lng];
};
