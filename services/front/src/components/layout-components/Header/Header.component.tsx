import React from 'react';


import ChangeLanguage from '@components/ChangeLanguage/ChangeLanguage.component';
import ChangeTheme from '@components/ChangeTheme/ChangeTheme.component';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';

import { HeaderProps } from '@components/Header/Header.interace';
import { theme } from '@store/global/global.state';
import {
  Box,
  Container,
  Hamburger,
  ImageWrapper,
  LanguageContainer,
  Link,
  MobileMenuContainer,
  ThemeContainer,
  MobileLink, MobileMenuWrapper
} from '@styles/Header.style';

export const Header = ({ locale, translation }: HeaderProps) => {
  const router = useRouter();
  const [currentTheme, setCurrentTheme] = useRecoilState(theme);
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);

  const setTheme = (theme: 'dark' | 'light') => {
    setCurrentTheme(theme);
    localStorage.setItem('theme', theme);
  };

  const toggleTheme = () => {
    if (currentTheme === 'dark') setTheme('light');
    else setTheme('dark');
  };

  const handleRedirect = async (path: string) => {
    await router.push(`/${locale}${path}`);
  };

  React.useEffect(() => {
    const theme = localStorage.getItem('theme') as 'dark' | 'light';
    if (['dark', 'light'].includes(theme)) setTheme(theme);
  }, []);

  return (
    <Container>
      <Box>
        <Hamburger
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {!showMobileMenu ? (
            <ImageWrapper>
              <Image
                className={'color'}
                src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/icons/hamburger.svg`}
                alt={'Hamburger'}
                width={28}
                height={28}
              />
            </ImageWrapper>
          ) : (
            <ImageWrapper>
              <Image
                className={'color'}
                src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/icons/close.svg`}
                alt={'Close'}
                width={28}
                height={28}
              />
            </ImageWrapper>
          )}
        </Hamburger>
        {showMobileMenu && (
          <MobileMenuContainer>
            <MobileMenuWrapper>
              <MobileLink
                onClick={() => handleRedirect('/')}
              >{translation('components:header.home')}</MobileLink>
              <MobileLink
                onClick={() => handleRedirect('/blog')}
              >{translation('components:header.blog')}</MobileLink>
              <MobileLink
                onClick={() => handleRedirect('/projects')}
              >{translation('components:header.projects')}</MobileLink>
              <MobileLink
                onClick={() => handleRedirect('/about')}
              >{translation('components:header.about')}</MobileLink>
            </MobileMenuWrapper>
          </MobileMenuContainer>
        )}

        <Link
          onClick={() => handleRedirect('/')}
        >{translation('components:header.home')}</Link>
        <Link
          onClick={() => handleRedirect('/blog')}
        >{translation('components:header.blog')}</Link>
        <Link
          onClick={() => handleRedirect('/projects')}
        >{translation('components:header.projects')}</Link>
        <Link
          onClick={() => handleRedirect('/about')}
        >{translation('components:header.about')}</Link>
      </Box>

      <LanguageContainer>
        <ChangeLanguage
          path={router.asPath}
          defaultLanguage={locale}
        />
      </LanguageContainer>

      <ThemeContainer>
        <ChangeTheme
          theme={currentTheme}
          onClick={() => toggleTheme()}
        />
      </ThemeContainer>
    </Container>
  );
};
