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
  HeaderLink,
  Paragraph
} from '@styles/login.style';


const Signin = () => {
  const router = useRouter();
  const { signIn, loading } = useSignInService();
  const { handleException } = useHandleException();
  const [rightSideHide, setRightSideHide] = React.useState(false);
  const { width } = useWindowDimensions();

  const [step, setStep] = React.useState(1);
  const [mfaType, setMfaType] = React.useState<'two-fa-required' | 'phone-two-fa-required'>();
  const [code, setCode] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [twoFaCode, setTwoFaCode] = React.useState('');

  const handleRedirect = async (path: string) => {
    await router.push(`/${path}`);
  };

  const signInUser = async (e?: any) => {
    try {
      if ((e && e.key === 'Enter') || !e) {
        const { _at, message } = await signIn({
          email, password, twoFaCode, code
        });

        if (message) {
          setMfaType(message);
          setStep(2);
          return;
        }

        localStorage.setItem('_at', _at);
        await handleRedirect('account');
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
        <title>Cryptotalks | Sign in</title>
      </Head>
      <CredentialsLayout leftSide={
        <>
          {step === 1 ? (
            <Box>
              <Title>Sign in</Title>

              <MarginWrapper>
                <Input
                  high={true}
                  onError={emailError}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={'Email'}
                />
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
                  placeholder={'Password'}
                />
              </MarginWrapper>

              <MarginWrapper>
                <Link
                  onClick={() => handleRedirect('forgot-password')}
                >{'Forgot password?'}</Link>
              </MarginWrapper>

              <MarginWrapper>
                <Button
                  disabled={passwordError || emailError || !password || !email}
                  highHeight={true}
                  text={'Sign in'}
                  onClick={() => signInUser()}
                />
              </MarginWrapper>

            </Box>
          ) : (
            <Box>
              <Title>Sign in</Title>
              <MarginWrapper className={'big'}>
                <Paragraph>
                  {mfaType === 'two-fa-required' ? 'This account has been protected by MFA, in order to continue, please, provide one-time 6-digit verification code.' : 'This account has been protected by mobile MFA, in order to continue, please, provide code from the SMS message.'}
                </Paragraph>
                {mfaType === 'two-fa-required' ? (
                  <TwoFa
                    title={'Two-factor authentication'}
                    setTwoFaCode={setTwoFaCode}
                  />
                ) : (
                  <TwoFa
                    title={'Mobile one-time authentication code has been sent. Please, provide code from the SMS message.'}
                    setTwoFaCode={setCode}
                  />
                )}
              </MarginWrapper>
              <MarginWrapper>
                <Button
                  highHeight={true}
                  text={'Sign in'}
                  fillButton={true}
                  onClick={() => signInUser()}
                />
              </MarginWrapper>
            </Box>
          )}
        </>
      } rightSide={
        <Box>
          <WelcomeTitle>
            Welcome back!
          </WelcomeTitle>
          <WelcomeTitle>
            We are glad to see again!
          </WelcomeTitle>
          <WelcomeText>
            We are quite sure you have been doing this hundreds times before, so, no need to explain what you need to do, fields on the left side.
          </WelcomeText>
        </Box>
      } headerLink={
        <HeaderLink>
          New one here? <Link
          onClick={() => handleRedirect('signup')}
        >Sign up!</Link>
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
