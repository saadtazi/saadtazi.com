import dynamic from 'next/dynamic';

const GeoLocatedMap = dynamic(() => import('./GeoLocatedMapNoSSR'), {
  ssr: false,
});

export default GeoLocatedMap;
