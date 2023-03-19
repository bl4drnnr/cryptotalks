import { atom } from 'recoil';

export const theme = atom<'dark' | 'light'>({
  key: 'theme',
  default: 'dark',
});
