import { FC, ReactNode, useEffect } from 'react';
import { useRef } from 'react';
import { Box } from '@mui/material';
import { MapProvider } from 'react-map-gl';
import Loader from 'components/common/Loader';

import dynamic from 'next/dynamic';
const Mapbox = dynamic(() => import('./Mapbox'), {
  loading: () => <Loader />,
  ssr: false,
});
const MapBoxGeocoder = dynamic(() => import('./MapboxGeocoder'), {
  loading: () => <Loader />,
  ssr: false,
});

export const Map: FC = () => {
  const mapContainerRef = useRef<ReactNode>(null);
  const geocoderRef = useRef<MapboxGeocoder | null>(null);

  useEffect(() => {
    return () => {
      mapContainerRef.current = null;
      geocoderRef.current = null;
    };
  }, []);

  return (
    <Box
      ref={mapContainerRef}
      width="100%"
      height="100%"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <MapProvider>
        <Mapbox containerRef={mapContainerRef} geocoderRef={geocoderRef}>
          <MapBoxGeocoder geocoderRef={geocoderRef} />
        </Mapbox>
      </MapProvider>
    </Box>
  );
};

export default Map;
