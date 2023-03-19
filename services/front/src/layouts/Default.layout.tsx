import React from 'react';

import { Footer } from '@components/Footer/Footer.component';
import { Header } from '@components/Header/Header.component';
import GlobalLayout from '@layouts/Global.layout';
import { MainBox, MainWrapper } from '@styles/layout/default.style';

interface DefaultLayoutProps {
  children: React.ReactElement | React.ReactElement[];
  loading?: boolean;
  locale: string;
  translation: any;
}

const DefaultLayout = ({ loading, children, locale, translation }: DefaultLayoutProps) => {
  return (
    <GlobalLayout loading={loading}>
      <MainWrapper>
        <Header locale={locale} translation={translation} />
        <MainBox>
          {children}
        </MainBox>
      </MainWrapper>
      <Footer locale={locale} translation={translation} />
    </GlobalLayout>
  );
};

export default DefaultLayout;
