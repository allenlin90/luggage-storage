import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import type { FC, MutableRefObject } from 'react';
import type { Map as MapboxMap } from 'mapbox-gl';
import type MapboxGeocoderType from '@mapbox/mapbox-gl-geocoder';
import getConfig from 'next/config';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  geocoderConfigState,
  geocoderPositionState,
  markersState,
} from 'states/map';
import { useMap } from 'react-map-gl';

const {
  publicRuntimeConfig: { MAPBOX_GL_ACCESS_TOKEN },
} = getConfig();

export interface MapBoxGeocoderProps {
  geocoderRef?: MutableRefObject<MapboxGeocoder | null>;
}

export const MapBoxGeocoder: FC<MapBoxGeocoderProps> = ({
  geocoderRef = { current: null },
}) => {
  const { current: map } = useMap();
  const { t } = useTranslation('map');
  const geocoderConfig = useRecoilValue(geocoderConfigState);
  const geocoderPosition = useRecoilValue(geocoderPositionState);
  const setMarkers = useSetRecoilState(markersState);

  const options = useMemo(() => {
    return {
      accessToken: MAPBOX_GL_ACCESS_TOKEN,
      mapboxgl: map as unknown as MapboxMap,
      placeholder: t('search'),
      // add marker with custom function
      marker: false, //This doesn't work with react-map-gl
      ...geocoderConfig,
    };
  }, [map, t, geocoderConfig]);

  useEffect(() => {
    const initGeocoder = async () => {
      const MapboxGeocoder = await import('@mapbox/mapbox-gl-geocoder').then(
        (mod) => mod.default
      );

      geocoderRef.current = new MapboxGeocoder(options);

      map?.addControl(geocoderRef.current, geocoderPosition);
      geocoderRef.current.on(
        'result',
        ({ result }: { result: MapboxGeocoderType.Result }) => {
          const [lng, lat] = result.center;
          const id = result?.id?.toString() ?? Date.now().toString();
          setMarkers([{ id, lat, lng }]);
        }
      );
    };

    if (!geocoderRef.current) {
      initGeocoder();
    }
  }, [map, options, geocoderPosition, setMarkers, geocoderRef]);

  return null;
};

export default MapBoxGeocoder;
