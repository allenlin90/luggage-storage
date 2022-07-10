import type { UserCoords, MapMarker } from 'types/map';
import type { ControlPosition } from 'react-map-gl';
import type {
  GeocoderOptions,
  LngLatLiteral,
} from '@mapbox/mapbox-gl-geocoder';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

export const userCoordsState = atom<UserCoords | null>({
  key: 'userCoords',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const markersState = atom<MapMarker[]>({
  key: 'mapMarkers',
  default: [],
});

export const geocoderPositionState = atom<ControlPosition>({
  key: 'geocoderPosition',
  default: 'top-left',
});

export const geocoderLimitState = atom<number>({
  key: 'geocoderLimit',
  default: 5,
});

export const geocoderCountriesState = atom<string>({
  key: 'geocoderCountries',
  default: 'TH',
});

export const geocoderProximityState = atom<string>({
  key: 'geocoderProximity',
  default: 'ip',
});

export const geocoderConfigState = atom<Partial<GeocoderOptions>>({
  key: 'geocoderConfig',
  default: {
    limit: 5,
    countries: 'TH',
    proximity: 'ip' as unknown as LngLatLiteral,
    clearAndBlurOnEsc: true,
  },
});
