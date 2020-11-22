import React from 'react';
import ReactDOMServer from 'react-dom/server';
import L, { LatLngExpression } from 'leaflet';
import RoomIcon from '@material-ui/icons/Room';
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

const icon = L.divIcon({
  className: 'custom-icon',
  html: ReactDOMServer.renderToString(<RoomIcon style={{ color: 'white' }} />),
});

const Map: React.FC<MapProps> = ({ center, containerOptions }) => {
  if (!center) {
    return <StyledNoMap />;
  }
  return (
    <StyledMap>
      <MapContainer
        // zoomControl={false}
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
