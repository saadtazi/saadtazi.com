import React from "react";
import useGeolocation from "react-use/lib/useGeolocation";
import { LatLngExpression } from "leaflet";
import Map from "./Map";

const mtlLocation: LatLngExpression = [45.5019, -73.5674];

const GeoLocatedMap: React.FC = () => {
  let center = mtlLocation;
  return <Map center={center} containerOptions={{ zoomControl: false }} />;
};

export default GeoLocatedMap;
