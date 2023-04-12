import React from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { Button } from '@components/Button/Button.component';
import { useHandleException } from '@hooks/useHandleException.hook';
import CredentialsLayout from '@layouts/Credentials.layout';
import { useAccountConfirmationService } from '@services/account-confirmation/account-confirmation.service';
import {
  Box,
  HeaderLink,
  Link,
  MarginWrapper,
  SubTitle,
  Title,
  WelcomeText,
  WelcomeTitle
} from '@styles/login.style';

const AccountConfirmation = () => {
  const router = useRouter();
  const { handleException } = useHandleException();
  const { loading, confirmAccount } = useAccountConfirmationService();

  const [confirmationStatus, setConfirmationStatus] = React.useState(1);

  React.useEffect(() => {
    const { confirmationHash } = router.query;
    if (confirmationHash) {
      confirmAccountRegistration(confirmationHash as string)
        .then(() => setConfirmationStatus(2));
    }
  }, [router.query]);

  const handleRedirect = async (path: string) => {
    await router.push(`/${path}`);
  };

  const confirmAccountRegistration = async (hash: string) => {
    try {
      return await confirmAccount({ hash });
    } catch (e) {
      setConfirmationStatus(3);
      handleException(e);
    }
  };

  return (
    <>
      <Head>
        <title>Cryptotalks | Account confirmation</title>
      </Head>
      <CredentialsLayout
        leftSide={
          <Box>
            <Title>Account confirmation</Title>
            <>
              {confirmationStatus === 1 ? (
                <MarginWrapper>
                  <SubTitle>Please, be patient, we are some magic stuff behind the scene while verifying your account.</SubTitle>
                </MarginWrapper>
              ) : (confirmationStatus === 2 ? (
                <>
                  <MarginWrapper>
                    <SubTitle>Success! Welcome here, newbie! It's nice to see you, hang around here and try to find some fun.</SubTitle>
                  </MarginWrapper>
                  <MarginWrapper>
                    <Button
                      fillButton={true}
                      text={'Sign In'}
                      onClick={() => handleRedirect('/signin')}
                    />
                  </MarginWrapper>
                </>
              ) : (
                <>
                  <MarginWrapper>
                    <SubTitle>Um... You know, something went wrong there... Well... Wanna try again?!</SubTitle>
                  </MarginWrapper>
                  <MarginWrapper>
                    <Button
                      fillButton={true}
                      text={'Go Home'}
                      onClick={() => handleRedirect('/')}
                    />
                  </MarginWrapper>
                </>
              ))}
            </>
          </Box>
        }
        rightSide={
          <Box>
            <WelcomeTitle>You are almost there!</WelcomeTitle>
            <WelcomeText>Verification of your email is the last things separates you and the wonderful world of WEB3!</WelcomeText>
          </Box>
        }
        headerLink={
          <>
            <HeaderLink><Link onClick={() => handleRedirect('/signin')}
            >Sign In</Link></HeaderLink>
          </>
        }
        loading={loading}
        rightDarkSide={true}
      />
    </>
  );
};

export default AccountConfirmation;
