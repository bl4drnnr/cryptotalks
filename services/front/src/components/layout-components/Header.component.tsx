import React from 'react';

import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';

import { ThemeToggler } from '@components/ThemeToggler/ThemeToggler.component';
import { useHandleException } from '@hooks/useHandleException.hook';
// import { useLogoutService } from '@services/logout/logout.service';
import { theme } from '@store/global/global.state';
import {
  Container,
  Box,
  Buttons,
  Links,
  Link,
  Button,
  Logo,
  NavigationButtons
} from '@styles/Header.style';

export const Header = () => {
  const router = useRouter();
  const [currentTheme, setCurrentTheme] = useRecoilState(theme);
  const [tokenPersists, setTokenPersistence] = React.useState(false);

  // const { loading, logout } = useLogoutService();
  const { handleException } = useHandleException();

  const handleRedirect = async (path: string) => {
    await router.push(`/${path}`);
  };

  const setTheme = (theme: 'dark' | 'light') => {
    setCurrentTheme(theme);
    localStorage.setItem('theme', theme);
  };

  const toggleTheme = () => {
    if (currentTheme === 'dark') setTheme('light');
    else setTheme('dark');
  };

  const fetchLogout = async () => {
    try {
      const token = sessionStorage.getItem('_at');
      // const response = await logout({ token });

      // if (response.message === 'success') {
      //   setTokenPersistence(false);
      //   sessionStorage.removeItem('_at');
      //   await handleRedirect('/');
      // }
    } catch (e) {
      handleException(e);
    }
  };

  React.useEffect(() => {
    const theme = localStorage.getItem('theme') as 'dark' | 'light';
    if (['dark', 'light'].includes(theme)) setTheme(theme);

    const token = sessionStorage.getItem('_at');
    if (token) setTokenPersistence(true);
  }, []);

  return (
    <>
      <Container>
        <Box>
          <NavigationButtons>
            <Logo onClick={() => handleRedirect('/')}></Logo>
            <Links>
              <Link onClick={() => handleRedirect('/about')}></Link>
              <Link onClick={() => handleRedirect('/market')}></Link>
              <Link onClick={() => handleRedirect('/contact')}></Link>
            </Links>
          </NavigationButtons>

          <Buttons>
            {tokenPersists ? (
              <>
                <Button
                  className={classNames({ logIn: true })}
                  onClick={() => handleRedirect('/account')}
                >
                </Button>
                <Button
                  className={classNames({ signup: true })}
                  onClick={() => fetchLogout()}
                >
                </Button>
              </>
            ) : (
              <>
                <Button
                  className={classNames({ logIn: true })}
                  onClick={() => handleRedirect('/signin')}
                >
                </Button>
                <Button
                  className={classNames({ signup: true })}
                  onClick={() => handleRedirect('/signup')}
                >
                </Button>
              </>
            )}
            <ThemeToggler
              theme={currentTheme}
              onClick={() => toggleTheme()}
            />
          </Buttons>
        </Box>
      </Container>
    </>
  );
};
