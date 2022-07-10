import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import type { FC } from 'react';
import type { ControlPosition } from 'react-map-gl';
import type MapboxGeocoderType from '@mapbox/mapbox-gl-geocoder';
import { useTranslation } from 'next-i18next';
import { useRecoilValue } from 'recoil';
import { geocoderConfigState } from 'states/map';
import { useControl } from 'react-map-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

type GeocoderControlProps = Omit<
  MapboxGeocoderType.GeocoderOptions,
  'accessToken' | 'mapboxgl' | 'marker'
> & {
  accessToken: string;
  position?: ControlPosition;
  onLoading?: (e: object) => void;
  onResults?: (e: { results: MapboxGeocoderType.Results }) => void;
  onResult?: (e: { result: MapboxGeocoderType.Result }) => void;
  onError?: (e: object) => void;
};

export const MapBoxGeocoder: FC<GeocoderControlProps> = ({
  accessToken,
  position = 'top-left',
  onLoading,
  onResult,
  onResults,
  onError,
}) => {
  const { t } = useTranslation('map');
  const geocoderConfig = useRecoilValue(geocoderConfigState);

  useControl<MapboxGeocoder>(
    () => {
      const ctrl = new MapboxGeocoder({
        ...geocoderConfig,
        marker: false,
        accessToken,
        placeholder: t('search'),
      });

      if (onLoading) {
        ctrl.on('loading', onLoading);
      }

      if (onResults) {
        ctrl.on('results', onResults);
      }

      if (onResult) {
        ctrl.on('result', onResult);
      }

      if (onError) {
        ctrl.on('error', onError);
      } else {
        ctrl.on('error', ({ error }) => {
          console.log(error);
        });
      }

      return ctrl;
    },
    { position }
  );

  return null;
};

export default MapBoxGeocoder;
