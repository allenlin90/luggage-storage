import { atom } from 'recoil';

export const arState = atom<boolean>({
  key: 'openAR',
  default: false,
});
