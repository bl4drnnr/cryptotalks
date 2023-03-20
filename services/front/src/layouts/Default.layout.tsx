import React from 'react';

import { Footer } from '@components/Footer.component';
import { Header } from '@components/Header.component';
import GlobalLayout from '@layouts/Global.layout';
import { ContentWrapper, Wrapper } from '@styles/Default.style';


interface DefaultLayoutProps {
  children: React.ReactElement | React.ReactElement[];
  loading?: boolean;
}

const DefaultLayout = ({ children, loading = false }: DefaultLayoutProps) => {
  return (
    <GlobalLayout loading={loading}>
      <Wrapper>
        <ContentWrapper>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </ContentWrapper>
      </Wrapper>
    </GlobalLayout>
  );
};

export default DefaultLayout;
