import type { UserCoords, MapMarker } from 'types/map';
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
