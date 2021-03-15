import React from 'react';
import ReactDOMServer from 'react-dom/server';
import RoomIcon from '@material-ui/icons/Room';
import L from 'leaflet';

export const getIcon = (color: string) => {
  const icon = L.divIcon({
    className: 'custom-icon',
    html: ReactDOMServer.renderToString(<RoomIcon style={{ color }} />),
  });
  return icon;
};

export const getDefaultIcon = (options?: L.IconOptions) => {
  return L.icon({
    ...(options || {}),
    iconUrl: '/leaflet/marker-icon.png',
    iconRetinaUrl: '/leaflet/marker-icon-2x.png',
    shadowUrl: '/leaflet/marker-shadow.png',
    iconSize: [25, 41],
    shadowSize: [25, 41],
  });
};

export const getMarker = (
  icon: L.Icon,
  latlng: L.LatLngExpression,
  children: React.ReactElement,
  onMarkerClick: (...args: any) => void
) => {
  return L.marker(latlng, { icon })
    .on('click', onMarkerClick)
    .bindPopup(ReactDOMServer.renderToString(children));
};
