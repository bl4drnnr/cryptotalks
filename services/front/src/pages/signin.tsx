import React from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { Button } from '@components/Button/Button.component';
import { Input } from '@components/Input/Input.component';
import { TwoFa } from '@components/TwoFa/TwoFa.component';
import { useWindowDimensions } from '@hooks/useGetWindowDimensions.hook';
import { useHandleException } from '@hooks/useHandleException.hook';
import { validateEmail, validatePasswordLength } from '@hooks/useValidators.hook';
import CredentialsLayout from '@layouts/Credentials.layout';
import { useSignInService } from '@services/signin/signin.service';
import {
  Box,
  Link,
  WelcomeTitle,
  WelcomeText,
  LoginOptions,
  VerticalLine,
  LoginOption,
  MarginWrapper,
  Title,
  HeaderLink
} from '@styles/login.style';


const Signin = () => {
  const router = useRouter();
  const { signIn, loading } = useSignInService();
  const { handleException } = useHandleException();
  const [rightSideHide, setRightSideHide] = React.useState(false);
  const { height, width } = useWindowDimensions();

  const [step, setStep] = React.useState(1);
  const [loginOption, setLoginOption] = React.useState('email');
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [twoFa, setTwoFa] = React.useState('');

  const handleRedirect = async (path: string) => {
    await router.push(`/${path}`);
  };

  const signInUser = async (e?: any) => {
    try {
      if ((e && e.key === 'Enter') || !e) {
        const { _at } = await signIn({
          email, password
        });
        sessionStorage.setItem('_at', _at);
        await handleRedirect('/account');
      }
    } catch (e) {
      handleException(e);
    }
  };

  React.useEffect(() => {
    if (password.length > 0)
      setPasswordError(!validatePasswordLength(password));
  }, [password]);

  React.useEffect(() => {
    if (width) setRightSideHide(width <= 1050);
  }, [width]);

  React.useEffect(() => {
    if (!validateEmail(email)) setEmailError(true);
    else if (validateEmail(email) === 1) setEmailError(false);
    else setEmailError(false);
  }, [email]);

  return (
    <>
      <Head>
        <title></title>
      </Head>
      <CredentialsLayout leftSide={
        <>
          {step === 1 ? (
            <Box>
              <Title></Title>

              <LoginOptions>
                <LoginOption onClick={() => setLoginOption('email')}></LoginOption>
                <VerticalLine/>
                <LoginOption onClick={() => setLoginOption('phone')}></LoginOption>
              </LoginOptions>

              <MarginWrapper>
                {loginOption === 'email' ? (
                  <Input
                    high={true}
                    onError={emailError}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={''}
                  />
                ) : (
                  <Input
                    high={true}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={''}
                  />
                )}
              </MarginWrapper>

              <MarginWrapper
                onKeyDown={(e) => signInUser(e)}
              >
                <Input
                  onError={passwordError}
                  high={true}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={'password'}
                  placeholder={''}
                />
              </MarginWrapper>

              <MarginWrapper>
                <Link
                  onClick={() => handleRedirect('/forgot-password')}
                >{''}</Link>
              </MarginWrapper>

              <MarginWrapper>
                <Button
                  disabled={passwordError || emailError || !password || !email}
                  highHeight={true}
                  text={''}
                  onClick={() => signInUser()}
                />
              </MarginWrapper>

            </Box>
          ) : (
            <Box>
              <Title></Title>
              <MarginWrapper className={'big'}>
                <TwoFa
                  title={''}
                  setTwoFaCode={setTwoFa}
                />
              </MarginWrapper>
              <MarginWrapper>
                <Button highHeight={true} text={''} fillButton={true}/>
              </MarginWrapper>
            </Box>
          )}
        </>
      } rightSide={
        <Box>
          <WelcomeTitle>
          </WelcomeTitle>
          <WelcomeTitle>
          </WelcomeTitle>
          <WelcomeText>
          </WelcomeText>
        </Box>
      } headerLink={
        <HeaderLink>
           <Link
          onClick={() => handleRedirect('/signup')}
        ></Link>
        </HeaderLink>
      } leftDarkSide={true}
        mirroredHeader={true}
        rightSideHide={rightSideHide}
        loading={loading}
      />
    </>
  );
};

export default Signin;
