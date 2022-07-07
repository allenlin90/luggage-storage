import type { ReactNode } from 'react';
import { atom } from 'recoil';
// import { recoilPersist } from 'recoil-persist';
// const { persistAtom } = recoilPersist();

export const openDialog = atom<boolean>({
  key: 'openDialog',
  default: false,
});

export const dialogTitle = atom<ReactNode>({
  key: 'dialogTitle',
  default: '',
});

export const dialogBody = atom<ReactNode>({
  key: 'dialogBody',
  default: null,
});

export const dialogAction = atom<ReactNode>({
  key: 'dialogAction',
  default: null,
});
