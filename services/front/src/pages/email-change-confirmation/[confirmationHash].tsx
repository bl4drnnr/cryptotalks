import React from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { Button } from '@components/Button/Button.component';
import { useHandleException } from '@hooks/useHandleException.hook';
import CredentialsLayout from '@layouts/Credentials.layout';
import { useEmailChangeConfirmationService } from '@services/email-change-confirmation/email-change-confirmation.service';
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

const EmailChangeConfirmation = () => {
  const router = useRouter();
  const { handleException } = useHandleException();
  const { loading, confirmEmailChange } = useEmailChangeConfirmationService();

  const [confirmationStatus, setConfirmationStatus] = React.useState(1);

  React.useEffect(() => {
    const { confirmationHash } = router.query;
    if (confirmationHash) {
      fetchConfirmEmailChange(confirmationHash as string)
        .then(() => setConfirmationStatus(2));
    }
  }, [router.query]);

  const handleRedirect = async (path: string) => {
    await router.push(`${path}`);
  };

  const fetchConfirmEmailChange = async (hash: string) => {
    try {
      return await confirmEmailChange({ hash });
    } catch (e) {
      setConfirmationStatus(3);
      handleException(e);
    }
  };

  return (
    <>
      <Head>
        <title>Cryptotalks | Email change confirmation</title>
      </Head>
      <CredentialsLayout
        leftSide={
          <Box>
            <WelcomeTitle>You are about to change email!</WelcomeTitle>
            <WelcomeText>Changing of your email is nothing separating you and the wonderful world of WEB3!</WelcomeText>
          </Box>
        }
        rightSide={
          <Box>
            <Title>Email changing confirmation</Title>
            <>
              {confirmationStatus === 1 ? (
                <MarginWrapper>
                  <SubTitle>Please, be patient, we are some magic stuff behind the scene while changing your email.</SubTitle>
                </MarginWrapper>
              ) : (confirmationStatus === 2 ? (
                <>
                  <MarginWrapper>
                    <SubTitle>Success! Email has been successfully changed, feel free to log in use it now.</SubTitle>
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
        leftDarkSide={true}
        headerLink={
          <>
            <HeaderLink><Link onClick={() => handleRedirect('/signin')}
            >Sign In</Link></HeaderLink>
          </>
        }
        loading={loading}
      />
    </>
  );
};

  export default EmailChangeConfirmation;
