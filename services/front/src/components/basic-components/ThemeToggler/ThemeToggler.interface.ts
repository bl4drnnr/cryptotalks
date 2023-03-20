type TTheme = 'dark' | 'light';

export interface ThemeTogglerProps {
  theme: TTheme;
  onClick: () => void | never;
}
