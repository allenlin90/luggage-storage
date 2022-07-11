import 'mapbox-gl/dist/mapbox-gl.css';
import type { FC, ReactNode } from 'react';
import type {
  FullscreenControlProps,
  GeolocateControlProps,
  NavigationControlProps,
} from 'react-map-gl';
import { isMobile } from 'react-device-detect';
import Map from 'react-map-gl';

import dynamic from 'next/dynamic';
const FullscreenControl = dynamic<FullscreenControlProps>(() =>
  import('react-map-gl').then((mod) => mod.FullscreenControl)
);
const GeolocateControl = dynamic<GeolocateControlProps>(() =>
  import('react-map-gl').then((mod) => mod.GeolocateControl)
);
const NavigationControl = dynamic<NavigationControlProps>(() =>
  import('react-map-gl').then((mod) => mod.NavigationControl)
);

export interface MapboxProps {
  accessToken: string;
  children?: ReactNode;
  fullscreenControl?: boolean;
  geoLocateControl?: boolean;
  initialViewState?: {
    latitude: number;
    longitude: number;
    zoom?: number;
  };
}

const Component: FC<MapboxProps> = ({
  children,
  accessToken,
  fullscreenControl = false,
  geoLocateControl = false,
  initialViewState,
}) => {
  return (
    <Map
      mapboxAccessToken={accessToken}
      initialViewState={initialViewState}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      reuseMaps // prevent unncessary unmounting
      scrollZoom
      trackResize
      doubleClickZoom
    >
      {!isMobile && <NavigationControl />}
      {fullscreenControl && <FullscreenControl position="bottom-right" />}
      {geoLocateControl && <GeolocateControl position="bottom-right" />}
      {children}
    </Map>
  );
};

// export const Mapbox = memo(Component);
export const Mapbox = Component;
export default Mapbox;
