import React from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { Button } from '@components/Button/Button.component';
import { Input } from '@components/Input/Input.component';
import { InputButton } from '@components/InputButton/InputButton.component';
import { useWindowDimensions } from '@hooks/useGetWindowDimensions.hook';
import CredentialsLayout from '@layouts/Credentials.layout';
import {
  Box,
  Link,
  WelcomeTitle,
  LoginOptions,
  LoginOption,
  VerticalLine,
  MarginWrapper,
  HeaderLink,
  Title
} from '@styles/login.style';

const ForgotPassword = () => {
  const router = useRouter();
  const [hideLeftSide, setHideLeftSide] = React.useState(false);
  const { height, width } = useWindowDimensions();

  const [passwordRecoveryMethod, setPasswordRecoveryMethod] = React.useState('email');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [verificationCode, setVerificationCode] = React.useState('');

  const handleRedirect = async (path: string) => {
    await router.push(`/${path}`);
  };

  React.useEffect(() => {
    if (width) setHideLeftSide(width <= 1050);
  }, [width]);

  return (
    <>
      <Head>
        <title>Cryptotalks | Forgot password</title>
      </Head>
      <CredentialsLayout leftSide={
        <Box>
          <WelcomeTitle>
            Forgot password?
          </WelcomeTitle>
          <WelcomeTitle>
            Hah... Not a big deal!
          </WelcomeTitle>

        </Box>
      } rightSide={
        <Box>
          <Title>Forgot password?</Title>
          <LoginOptions>
            <LoginOption onClick={() => setPasswordRecoveryMethod('email')}>With email</LoginOption>
            <VerticalLine/>
            <LoginOption onClick={() => setPasswordRecoveryMethod('phone')}>With password</LoginOption>
          </LoginOptions>

          {passwordRecoveryMethod === 'email' ? (
            <MarginWrapper>
              <InputButton
                buttonTitle={'Send code'}
                onChange={() => {
                }}
                onClick={() => {
                }}
                placeholder={'Email'}
                value={email}
              />
            </MarginWrapper>
          ) : (
            <MarginWrapper>
              <InputButton
                buttonTitle={'Send code'}
                onChange={() => {
                }}
                onClick={() => {
                }}
                placeholder={'Phone'}
                value={phone}
              />
            </MarginWrapper>
          )}

          <MarginWrapper>
            <Input
              high={true}
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder={'Verification code'}
            />
          </MarginWrapper>

          <MarginWrapper>
            <Button highHeight={true} text={'Submit'}/>
          </MarginWrapper>
        </Box>
      } headerLink={
        <HeaderLink>
          Do not have an account yet? <Link
          onClick={() => handleRedirect('/signup')}
        >Sign up now!</Link>
        </HeaderLink>
      } rightDarkSide={true}
        leftSideHide={hideLeftSide}
      />
    </>
  );
};

export default ForgotPassword;
