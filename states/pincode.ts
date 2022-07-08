import { atom } from 'recoil';
// import { recoilPersist } from 'recoil-persist';
// const { persistAtom } = recoilPersist();

export const pincodeState = atom<boolean>({
  key: 'pincode',
  default: false,
});

export const pincodeAuthState = atom<(() => void) | (() => Promise<void>)>({
  key: 'pincodeAuth',
  // eslint-disable-next-line
  default: () => {},
});
