import type { FC } from 'react';
import getConfig from 'next/config';
import { useSetRecoilState } from 'recoil';
import { markersState } from 'states/map';
import { Box } from '@mui/material';
import { MapProvider } from 'react-map-gl';
import Loader from 'components/common/Loader';

const {
  publicRuntimeConfig: { MAPBOX_GL_ACCESS_TOKEN },
} = getConfig();

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
  const setMarkers = useSetRecoilState(markersState);

  return (
    <Box
      width="100%"
      height="100%"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <MapProvider>
        <Mapbox accessToken={MAPBOX_GL_ACCESS_TOKEN}>
          <MapBoxGeocoder
            accessToken={MAPBOX_GL_ACCESS_TOKEN}
            onResult={(e) => {
              const { result } = e;
              const [lng, lat] =
                result &&
                (result.center ||
                  (result.geometry?.type === 'Point' &&
                    result.geometry.coordinates));
              if (location) {
                const id = result?.id?.toString() || Date.now().toString();
                setMarkers([{ id, lng, lat }]);
              }
            }}
          />
        </Mapbox>
      </MapProvider>
    </Box>
  );
};

export default Map;
