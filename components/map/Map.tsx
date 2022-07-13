import type { FC, ReactNode } from 'react';
import getConfig from 'next/config';
import { useEffect } from 'react';
import { useGeolocation } from 'react-use';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userCoordsState, markersState } from 'states/map';
import { Box } from '@mui/material';
import Loader from 'components/common/loader/Loader';

const {
  publicRuntimeConfig: { MAPBOX_GL_ACCESS_TOKEN: accessToken },
} = getConfig();

import dynamic from 'next/dynamic';
const Mapbox = dynamic(() => import('./Mapbox'), {
  loading: () => <Loader />,
  ssr: false,
});
const MapProvider = dynamic<{ children?: ReactNode }>(
  () => import('react-map-gl').then((mod) => mod.MapProvider),
  { ssr: false }
);
const MapBoxGeocoder = dynamic(() => import('./MapboxGeocoder'), {
  ssr: false,
});
const MapboxMarkers = dynamic(() => import('./MapboxMarkers'), {
  ssr: false,
});

export const Map: FC = () => {
  const geo = useGeolocation();
  const setMarkers = useSetRecoilState(markersState);
  const [userCoords, setUserCoords] = useRecoilState(userCoordsState);

  useEffect(() => {
    if (geo.latitude && geo.longitude) {
      // update only when geo changes
      if (!userCoords) {
        setUserCoords({ lat: geo.latitude, lng: geo.longitude });
      }
    }
  }, [geo.latitude, geo.longitude, setUserCoords, userCoords, setMarkers]);

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
        <Mapbox
          accessToken={accessToken}
          fullscreenControl
          geoLocateControl
          initialViewState={{
            latitude: userCoords?.lat ?? 13.736717,
            longitude: userCoords?.lng ?? 100.523186,
            zoom: 13,
          }}
        >
          <MapboxMarkers />
          <MapBoxGeocoder
            accessToken={accessToken}
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
