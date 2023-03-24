import React from 'react';

import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';

import GlobalLayout from '@layouts/Global.layout';
import { theme } from '@store/global/global.state';
import { Container, Side, LoginHeader, LoginHeaderButton, LoginHeaderTitle } from '@styles/Credentials.style';


interface CredentialsLayoutProps {
  leftSide: React.ReactElement | React.ReactElement[];
  rightSide: React.ReactElement | React.ReactElement[];
  headerLink: React.ReactElement | React.ReactElement[];
  leftDarkSide?: boolean;
  rightDarkSide?: boolean;
  leftSideHide?: boolean;
  rightSideHide?: boolean;
  mirroredHeader?: boolean;
  loading?: boolean;
}

const CredentialsLayout = ({
  leftSide,
  rightSide,
  headerLink,
  leftDarkSide = false,
  rightDarkSide = false,
  leftSideHide = false,
  rightSideHide = false,
  mirroredHeader = false,
  loading = false
}: CredentialsLayoutProps): React.ReactElement => {
  const router = useRouter();
  const [currentTheme, setCurrentTheme] = useRecoilState(theme);

  const handleRedirect = async (path: string) => {
    await router.push(`/${path}`);
  };

  const setTheme = (theme: 'dark' | 'light') => {
    setCurrentTheme(theme);
    localStorage.setItem('theme', theme);
  };

  React.useEffect(() => {
    const theme = localStorage.getItem('theme') as 'dark' | 'light';
    if (['dark', 'light'].includes(theme)) setTheme(theme);
  }, []);

  return (
    <GlobalLayout loading={loading}>
      <Container>

        <LoginHeader>
          {mirroredHeader ? (
            <>
              <LoginHeaderButton>
                {headerLink}
              </LoginHeaderButton>
              <LoginHeaderTitle
                onClick={() => handleRedirect('/')}
              >Cryptotalks</LoginHeaderTitle>
            </>
          ) : (
            <>
              <LoginHeaderTitle
                onClick={() => handleRedirect('/')}
              >Cryptotalks</LoginHeaderTitle>
              <LoginHeaderButton>
                {headerLink}
              </LoginHeaderButton>
            </>
          )}
        </LoginHeader>

        <Side className={classNames({ lightSide: leftDarkSide, leftSideHide })}>
          {leftSide}
        </Side>
        <Side className={classNames({ lightSide: rightDarkSide, rightSideHide })}>
          {rightSide}
        </Side>

      </Container>
    </GlobalLayout>
  );
};

export default CredentialsLayout;
