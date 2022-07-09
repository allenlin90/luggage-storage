import 'mapbox-gl/dist/mapbox-gl.css';
import { FC } from 'react';
import { useEffect, useRef } from 'react';
import getConfig from 'next/config';
import { useGeolocation } from 'react-use';
import { useRecoilState } from 'recoil';
import { userCoordsState } from 'states/map';
import type { Map as MapboxMap } from 'mapbox-gl';
import { Box } from '@mui/material';

const {
  publicRuntimeConfig: { MAPBOX_GL_ACCESS_TOKEN },
} = getConfig();

export const MapboxOrg: FC = () => {
  const geo = useGeolocation();
  const mapRef = useRef<MapboxMap | null>(null);
  const [userCoords, setUserCoords] = useRecoilState(userCoordsState);

  const initMap = async () => {
    const mapbox = await import('mapbox-gl');

    mapRef.current = new mapbox.Map({
      accessToken: MAPBOX_GL_ACCESS_TOKEN,
      container: 'mapbox-map',
      // style: 'mapbox://styles/mapbox/light-v10',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [userCoords?.lng ?? 0, userCoords?.lat ?? 0],
      zoom: 13,
    });

    mapRef.current
      .addControl(new mapbox.NavigationControl())
      .addControl(new mapbox.FullscreenControl());

    mapRef.current.on('error', (err: string) => {
      console.log(err);
    });
  };

  useEffect(() => {
    if (geo.latitude && geo.longitude) {
      setUserCoords({ lat: geo.latitude, lng: geo.longitude });
    }
  }, [geo.latitude, geo.longitude, setUserCoords]);

  useEffect(() => {
    initMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.stop();
        mapRef.current = null;
      }
    };
    // eslint-disable-next-line
  }, []);

  return <Box id="mapbox-map" sx={{ width: '100%', height: '100%' }} />;
};

export default MapboxOrg;
