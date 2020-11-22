import React, { useEffect } from "react";
import useGeolocation from "react-use/lib/useGeolocation";
import { LatLngExpression } from "leaflet";
import Map from "./Map";

const GeLocatedMap: React.FC = () => {
  const state = useGeolocation();
  let center: LatLngExpression | undefined =
    state.latitude && state.longitude
      ? [state.latitude, state.longitude]
      : undefined;
  return <Map center={center} containerOptions={{ zoomControl: false }} />;
};

export default GeLocatedMap;
