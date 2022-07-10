import 'mapbox-gl/dist/mapbox-gl.css';
import type { FC, ReactNode, MutableRefObject } from 'react';
import type { GeolocateControlRef } from 'react-map-gl';
import { useEffect, useRef } from 'react';
import getConfig from 'next/config';
import { useGeolocation } from 'react-use';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userCoordsState, markersState } from 'states/map';
import Map, {
  FullscreenControl,
  GeolocateControl,
  NavigationControl,
} from 'react-map-gl';
import MapboxMarkers from './MapboxMarkers';

const {
  publicRuntimeConfig: { MAPBOX_GL_ACCESS_TOKEN },
} = getConfig();

export interface MapboxProps {
  containerRef?: MutableRefObject<ReactNode>;
  geocoderRef?: MutableRefObject<MapboxGeocoder | null>;
  children?: ReactNode;
}

const Component: FC<MapboxProps> = ({ children }) => {
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
      mapboxAccessToken={MAPBOX_GL_ACCESS_TOKEN}
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
      <NavigationControl />
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
