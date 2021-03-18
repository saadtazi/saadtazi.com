import React from 'react';
import { LatLngExpression } from 'leaflet';
import { getIcon } from 'utils/leaflet';
import {
  MapContainer,
  TileLayer,
  Marker,
  MapContainerProps,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js';
import { StyledMap, StyledNoMap } from './Map.styles';

type MapProps = {
  center?: LatLngExpression;
  containerOptions?: Partial<MapContainerProps>;
};

const icon = getIcon('white');

const Map: React.FC<MapProps> = ({ center, containerOptions }) => {
  if (!center) {
    return <StyledNoMap />;
  }
  return (
    <StyledMap>
      <MapContainer
        {...containerOptions}
        center={center}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: 300 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={19}
        />
        <Marker position={center} icon={icon}></Marker>
      </MapContainer>
    </StyledMap>
  );
};

export default Map;
