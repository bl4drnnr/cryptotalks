import '@styles/globals.scss';
import React from 'react';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <RecoilRoot>
        <Head>
        </Head>
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  );
};

export default App;
