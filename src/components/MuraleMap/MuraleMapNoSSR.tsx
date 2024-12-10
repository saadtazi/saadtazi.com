import React from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
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
import Grid from '@mui/material/Grid2';

const MtlCenter: LatLngExpression = [45.5017, -73.5673];

const CenterOnMarkerClick: React.FC<{
  latlng: LatLngExpression | undefined;
}> = ({ latlng }) => {
  const map = useMap();
  React.useEffect(() => {
    if (latlng) {
      map.setView(latlng, map.getZoom(), {
        animate: true,
      });
    }
  }, [map, latlng]);

  return null;
};

const MuraleMap: React.FC = () => {
  const [murale, setMurale] = React.useState<Murale>();
  const { height } = useWindowSize();

  const onMarkerClick = (geoJsonFeature: MuraleGeoJSON) => () => {
    setMurale(fromFeature(geoJsonFeature));
  };

  const center = murale ? getCenter(murale) : MtlCenter;

  return (
    <StyledMuraleMap withMurale={!!murale} windowHeight={height}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: !!murale ? 6 : 12 }}>
          <MapContainer
            className="map"
            zoom={13}
            scrollWheelZoom={false}
            center={center}
            trackResize
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
            <CenterOnMarkerClick latlng={murale && getCenter(murale)} />
          </MapContainer>
        </Grid>
        {murale && (
          <Grid size={{ xs: 12, sm: 6 }}>
            <MuraleInfoCard
              murale={murale}
              onClose={() => setMurale(undefined)}
            />
          </Grid>
        )}
      </Grid>
    </StyledMuraleMap>
  );
};

export default MuraleMap;
