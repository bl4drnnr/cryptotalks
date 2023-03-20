import React from 'react';

import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Button } from '@components/Button/Button.component';
import { Input } from '@components/Input/Input.component';
import { InputButton } from '@components/InputButton/InputButton.component';
import { useWindowDimensions } from '@hooks/useGetWindowDimensions.hook';
import CredentialsLayout from '@layouts/Credentials.layout';
import { getStaticPaths, makeStaticProps } from '@lib/getStatic';
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

interface ForgotPasswordProps {
  locale: string;
}

const ForgotPassword = ({ locale }: ForgotPasswordProps) => {
  const { t } = useTranslation();

  const router = useRouter();
  const [hideLeftSide, setHideLeftSide] = React.useState(false);
  const { height, width } = useWindowDimensions();

  const [passwordRecoveryMethod, setPasswordRecoveryMethod] = React.useState('email');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [verificationCode, setVerificationCode] = React.useState('');

  const handleRedirect = async (path: string) => {
    await router.push(`/${locale}${path}`);
  };

  React.useEffect(() => {
    if (width) setHideLeftSide(width <= 1050);
  }, [width]);

  return (
    <>
      <Head>
        <title>Cryptodistrict | {t('pages:forgotPassword.title')}</title>
      </Head>
      <CredentialsLayout leftSide={
        <Box>
          <WelcomeTitle>
            {t('pages:forgotPassword.text1')}
          </WelcomeTitle>
          <WelcomeTitle>
            {t('pages:forgotPassword.text2')}
          </WelcomeTitle>

        </Box>
      } rightSide={
        <Box>
          <Title>{t('pages:forgotPassword.text1')}</Title>
          <LoginOptions>
            <LoginOption onClick={() => setPasswordRecoveryMethod('email')}>{t('pages:signin.withEmail')}</LoginOption>
            <VerticalLine/>
            <LoginOption onClick={() => setPasswordRecoveryMethod('phone')}>{t('pages:signin.withPhone')}</LoginOption>
          </LoginOptions>

          {passwordRecoveryMethod === 'email' ? (
            <MarginWrapper>
              <InputButton
                buttonTitle={t('placeholders:inputs.sendCode')}
                onChange={() => {
                }}
                onClick={() => {
                }}
                placeholder={t('placeholders:inputs.email')}
                value={email}
              />
            </MarginWrapper>
          ) : (
            <MarginWrapper>
              <InputButton
                buttonTitle={t('placeholders:inputs.sendCode')}
                onChange={() => {
                }}
                onClick={() => {
                }}
                placeholder={t('placeholders:inputs.phone')}
                value={phone}
              />
            </MarginWrapper>
          )}

          <MarginWrapper>
            <Input
              high={true}
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder={t('placeholders:inputs.verificationCode')}
            />
          </MarginWrapper>

          <MarginWrapper>
            <Button highHeight={true} text={t('placeholders:inputs.submit')}/>
          </MarginWrapper>
        </Box>
      } headerLink={
        <HeaderLink>
          {t('pages:signin.dontHaveAnAcc')} <Link
          onClick={() => handleRedirect('/signup')}
        >{t('pages:signin.signUpNow')}</Link>
        </HeaderLink>
      } rightDarkSide={true}
        locale={locale}
        leftSideHide={hideLeftSide}
      />
    </>
  );
};

const getStaticProps = makeStaticProps(['pages', 'components', 'errors', 'placeholders']);
export { getStaticPaths, getStaticProps };

export default ForgotPassword;
