import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { MuraleInfo, MuraleInfoCard } from './MuraleInfo';
import { getDefaultIcon, getMarker } from 'utils/leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js';
import data from './murales.geo.json';
import { Murale, MuraleGeoJSON } from 'types/models';
import { fromFeature, getCenter } from 'utils/murale';
import { StyledMuraleMap } from './MuraleMap.styles';
import { LatLngExpression } from 'leaflet';
import { useWindowSize } from 'react-use';

const MtlCenter: LatLngExpression = [45.5017, -73.5673];

const MuraleMap: React.FC = () => {
  const [murale, setMurale] = React.useState<Murale>();
  const { height } = useWindowSize();
  const onMarkerClick = (geoJsonFeature: MuraleGeoJSON) => () => {
    setMurale(fromFeature(geoJsonFeature));
  };

  const center = murale ? getCenter(murale) : MtlCenter;

  return (
    <StyledMuraleMap withMurale={!!murale} windowHeight={height}>
      <MapContainer
        className="map"
        zoom={13}
        scrollWheelZoom={false}
        center={center}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          subdomains="abc"
          maxZoom={19}
        />
        <GeoJSON
          /* @ts-ignore */
          data={data}
          pointToLayer={(geoJsonFeature, latlng) => {
            const { image, ...popupInfo } = fromFeature(geoJsonFeature);

            return getMarker(
              getDefaultIcon(),
              latlng,
              <MuraleInfo murale={popupInfo} />,
              onMarkerClick(geoJsonFeature)
            );
          }}
        />
      </MapContainer>
      {murale && (
        <MuraleInfoCard murale={murale} onClose={() => setMurale(undefined)} />
      )}
    </StyledMuraleMap>
  );
};

export default MuraleMap;
