import 'mapbox-gl/dist/mapbox-gl.css';
import type { FC, ReactNode } from 'react';
import type { GeolocateControlRef } from 'react-map-gl';
import { useEffect, useRef } from 'react';
import { useGeolocation } from 'react-use';
import { isMobile } from 'react-device-detect';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userCoordsState, markersState } from 'states/map';
import Map, {
  FullscreenControl,
  GeolocateControl,
  NavigationControl,
} from 'react-map-gl';
import MapboxMarkers from './MapboxMarkers';

export interface MapboxProps {
  accessToken: string;
  children?: ReactNode;
}

const Component: FC<MapboxProps> = ({ children, accessToken }) => {
  const geo = useGeolocation();
  const geoControlRef = useRef<GeolocateControlRef | null>(null);
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

  useEffect(() => {
    return () => {
      geoControlRef.current = null;
    };
  }, []);

  return (
    <Map
      mapboxAccessToken={accessToken}
      initialViewState={{
        latitude: userCoords?.lat ?? 13.736717,
        longitude: userCoords?.lng ?? 100.523186,
        zoom: 13,
      }}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      reuseMaps // prevent unncessary unmounting
      scrollZoom
      trackResize
      doubleClickZoom
    >
      <MapboxMarkers />
      {!isMobile && <NavigationControl />}
      <FullscreenControl position="bottom-right" />
      <GeolocateControl
        ref={geoControlRef}
        trackUserLocation
        position="bottom-right"
      />
      {children}
    </Map>
  );
};

// export const Mapbox = memo(Component);
export const Mapbox = Component;
export default Mapbox;
