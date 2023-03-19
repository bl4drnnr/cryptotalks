import { useMemo } from 'react';


import { useRecoilState } from 'recoil';

import { theme as storeTheme } from '@store/global/global.state';
import { DarkTheme } from '@styles/Dark.theme';
import { LightTheme } from '@styles/Light.theme';

const useDarkMode = () => {
  const [theme, setTheme] = useRecoilState(storeTheme);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const themeMode = useMemo(() => (theme === 'light' ? LightTheme : DarkTheme), [theme]);

  return [theme, toggleTheme, themeMode] as const;
};

export default useDarkMode;
