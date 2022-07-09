import 'mapbox-gl/dist/mapbox-gl.css';
import type { FC, ReactNode, MutableRefObject } from 'react';
import type { MapRef, GeolocateControlRef } from 'react-map-gl';
import { useEffect, useMemo, useRef } from 'react';
import getConfig from 'next/config';
import { useGeolocation } from 'react-use';
import { useRecoilState } from 'recoil';
import { userCoordsState, markersState } from 'states/map';
import Map, {
  Marker,
  FullscreenControl,
  GeolocateControl,
  NavigationControl,
} from 'react-map-gl';

const {
  publicRuntimeConfig: { MAPBOX_GL_ACCESS_TOKEN },
} = getConfig();

export interface MapboxProps {
  containerRef?: MutableRefObject<ReactNode>;
}

const Mapbox: FC<MapboxProps> = ({ containerRef = { current: null } }) => {
  const geo = useGeolocation();
  const mapRef = useRef<MapRef | null>(null);
  const geoControlRef = useRef<GeolocateControlRef | null>(null);
  const [userCoords, setUserCoords] = useRecoilState(userCoordsState);
  const [markers, setMarkers] = useRecoilState(markersState);

  const Markers = useMemo(() => {
    return markers.map(({ id, lat, lng }) => (
      <Marker
        key={id}
        color="red"
        longitude={lng}
        latitude={lat}
        draggable
      ></Marker>
    ));
  }, [markers]);

  useEffect(() => {
    if (geo.latitude && geo.longitude) {
      if (!userCoords) {
        setUserCoords({ lat: geo.latitude, lng: geo.longitude });
      }
      setMarkers((val) => {
        return [
          ...val,
          {
            id: Date.now().toString(),
            lat: geo.latitude ?? 13.736717,
            lng: geo.longitude ?? 100.523186,
          },
        ];
      });
    }
  }, [geo.latitude, geo.longitude, setUserCoords, userCoords, setMarkers]);

  return (
    <Map
      ref={mapRef}
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
      {Markers}
      <NavigationControl />
      <FullscreenControl position="bottom-right" />
      <GeolocateControl
        ref={geoControlRef}
        trackUserLocation
        position="bottom-right"
      />
    </Map>
  );
};

export default Mapbox;
