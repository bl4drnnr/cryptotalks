import React from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { Button } from '@components/Button/Button.component';
import { Input } from '@components/Input/Input.component';
import { InputButton } from '@components/InputButton/InputButton.component';
import { useWindowDimensions } from '@hooks/useGetWindowDimensions.hook';
import { useHandleException } from '@hooks/useHandleException.hook';
import { validateEmail } from '@hooks/useValidators.hook';
import CredentialsLayout from '@layouts/Credentials.layout';
import { useForgotPasswordService } from '@services/forgot-password/forgot-password.service';
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

  const { width } = useWindowDimensions();
  const { handleException } = useHandleException();
  const { loading: l0, forgotPassword } = useForgotPasswordService();

  const [hideLeftSide, setHideLeftSide] = React.useState(false);
  const [passwordRecoveryMethod, setPasswordRecoveryMethod] = React.useState('email');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);
  const [verificationString, setVerificationString] = React.useState('');
  const [resetMessageSent, setResetMessageSent] = React.useState(false);

  const fetchSendVerificationCode = async () => {
    try {
      const { message } = await forgotPassword({
        email, phone, verificationString
      });
      setResetMessageSent(message === 'sent');
    } catch (e) {
      handleException(e);
    }
  };

  const handleRedirect = async (path: string) => {
    await router.push(path);
  };

  React.useEffect(() => {
    if (!validateEmail(email)) setEmailError(true);
    else if (validateEmail(email) === 1) setEmailError(false);
    else setEmailError(false);
  }, [email]);

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
                onError={emailError}
                buttonTitle={'Send code'}
                onChange={(e) => setEmail(e.target.value)}
                onClick={() => fetchSendVerificationCode()}
                placeholder={'Email'}
                value={email}
              />
            </MarginWrapper>
          ) : (
            <MarginWrapper>
              <InputButton
                buttonTitle={'Send code'}
                onChange={(e) => setPhone(e.target.value)}
                onClick={() => fetchSendVerificationCode()}
                placeholder={'Phone'}
                value={phone}
              />
            </MarginWrapper>
          )}

          {resetMessageSent ? (
            <>
              <MarginWrapper>
                <Input
                  high={true}
                  value={verificationString}
                  onChange={(e) => setVerificationString(e.target.value)}
                  placeholder={'Verification code'}
                />
              </MarginWrapper>
              <MarginWrapper>
                <Button
                  onClick={() => fetchSendVerificationCode()}
                  highHeight={true}
                  text={'Submit'}
                />
              </MarginWrapper>
            </>
          ) : (<></>)}
        </Box>
      } headerLink={
        <HeaderLink>
          Do not have an account yet? <Link
          onClick={() => handleRedirect('/signup')}
        >Sign up now!</Link>
        </HeaderLink>
      } rightDarkSide={true}
        leftSideHide={hideLeftSide}
        loading={l0}
      />
    </>
  );
};

export default ForgotPassword;
