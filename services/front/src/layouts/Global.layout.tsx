import React from 'react';


import { useRouter } from 'next/router';
import { ThemeProvider } from 'styled-components';

import { Loader } from '@components/Loader/Loader.component';
import useDarkMode from '@hooks/useDarkMode.hook';
import { DarkTheme } from '@styles/Dark.theme';
import { LightTheme } from '@styles/Light.theme';

interface GlobalLayoutProps {
  children: React.ReactElement | React.ReactElement[];
  loading?: boolean;
}

const GlobalLayout = ({ children, loading = false }: GlobalLayoutProps) => {
  const router = useRouter();

  const [pageLoading, setPageLoading] = React.useState(false);
  const [theme] = useDarkMode();

  React.useEffect(() => {
    const handleStart = (url: any) => (url !== router.asPath) && setPageLoading(true);
    const handleComplete = (url: any) => (url === router.asPath) && setPageLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  });

  return (
    <ThemeProvider theme={theme === 'light' ? LightTheme : DarkTheme}>
      <Loader loading={loading || pageLoading} />
      {children}
    </ThemeProvider>
  );
};

export default GlobalLayout;
