import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

export const testState = atom<boolean>({
  key: 'test',
  default: false,
  effects_UNSTABLE: [persistAtom],
});
