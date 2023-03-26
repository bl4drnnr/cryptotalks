import React from 'react';

import dayjs from 'dayjs';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Button } from '@components/Button/Button.component';
import { Input } from '@components/Input/Input.component';
import { useHandleException } from '@hooks/useHandleException.hook';
import { useNotificationMessage } from '@hooks/useShowNotificationMessage.hook';
import DefaultLayout from '@layouts/Default.layout';
import { IPersonalInformation } from '@services/get-user-settings/get-user-settings.interface';
import { useRefreshTokenService } from '@services/refresh-tokens/refresh-tokens.service';
import { NotificationType } from '@store/global/global.state';
import {
  AccountContainer,
  AccountContentContainer,
  AccountInfo,
  AccountInfoContainer,
  Container,
  CreatedAtParagraph,
  FullName,
  Nickname,
  UserBio,
  UserInfoContainer,
  UserProfilePicture,
  UserSideBar,
  CreatedAtDate,
  Wrapper,
  AccountCreatedAtContainer,
  UserTitle,
  UserProfilePictureWrapper,
  ContactField,
  ContactIcon
} from '@styles/account.style';

const Account = () => {
  const router = useRouter();

  const fetchTokenChecking = React.useRef(true);
  const { loading: l1, refreshToken } = useRefreshTokenService();
  const { handleException } = useHandleException();
  const { showNotificationMessage } = useNotificationMessage();

  const [userData, setUserData] = React.useState<IPersonalInformation>();

  // React.useEffect(() => {
  //   if (fetchTokenChecking.current) {
  //     fetchTokenChecking.current = false;
  //     const token = sessionStorage.getItem('_at');
  //
  //     if (!token) handleRedirect('/').then();
  //     else checkUser(token).then((res) => {
  //       if (res) {
  //         sessionStorage.setItem('_at', res._at);
  //         setUserData(res.user);
  //       }
  //     });
  //   }
  // }, []);

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    showNotificationMessage({
      type: NotificationType.SUCCESS,
      content: 'Copied to clipboard',
    });
  };

  const handleRedirect = async (path: string) => {
    await router.push(`/${path}`);
  };

  const checkUser = async (token: string) => {
    try {
      // return await refreshToken({ token });
    } catch (e) {
      handleException(e);
      sessionStorage.removeItem('_at');
      await handleRedirect('');
    }
  };

  return (
    <>
      <Head>
        <title>Cryptotalks | My account</title>
      </Head>
      <DefaultLayout loading={l1}>
        <Container>
          <Wrapper>
            <AccountContainer>
              <UserInfoContainer>
                {userData && (
                  <UserProfilePicture>
                    <UserProfilePictureWrapper>
                      <Image className={'ava'} src={'/img/testava.jpg'} alt={'ava'} width={225} height={225}/>
                      <UserTitle>
                        {userData.title}
                      </UserTitle>
                      {userData.twitter && (
                        <ContactField
                          onClick={() => copyToClipboard(userData.twitter)}
                        >
                          <ContactIcon>
                            <Image src={'/img/twitter.svg'} width={32} height={32}  alt={'t'} />
                          </ContactIcon>
                          <Input
                            disabled={true}
                            value={userData.twitter}
                            placeholder={''}
                            onChange={() => {}}
                          />
                        </ContactField>
                      )}
                      {userData.linkedIn && (
                        <ContactField
                          onClick={() => copyToClipboard(userData.linkedIn)}
                        >
                          <ContactIcon>
                            <Image src={'/img/linkedin.svg'} width={32} height={32}  alt={'l'} />
                          </ContactIcon>
                          <Input
                            disabled={true}
                            value={userData.linkedIn}
                            placeholder={''}
                            onChange={() => {}}
                          />
                        </ContactField>
                      )}
                      {userData.personalWebsite && (
                        <ContactField
                          onClick={() => copyToClipboard(userData.personalWebsite)}
                        >
                          <ContactIcon>
                            <Image src={'/img/tag.svg'} width={32} height={32}  alt={'w'} />
                          </ContactIcon>
                          <Input
                            disabled={true}
                            value={userData.personalWebsite}
                            placeholder={''}
                            onChange={() => {}}
                          />
                        </ContactField>
                      )}
                    </UserProfilePictureWrapper>

                    <AccountInfoContainer>
                      <AccountInfo>
                        <Nickname>{userData.username}</Nickname>
                        <FullName>aka {userData.firstName} {userData.lastName}</FullName>
                        {userData?.email && (
                          <FullName>({userData?.email})</FullName>
                        )}
                      </AccountInfo>
                      <UserBio>{userData.bio}</UserBio>
                    </AccountInfoContainer>

                    <AccountCreatedAtContainer>
                      <CreatedAtParagraph>Account created at</CreatedAtParagraph>
                      <CreatedAtDate>{dayjs(userData.createdAt).format('YYYY-MM-DD')}</CreatedAtDate>
                    </AccountCreatedAtContainer>

                  </UserProfilePicture>
                )}
              </UserInfoContainer>

              <AccountContentContainer>
                <UserSideBar>
                  <Button
                    text={'Edit my profile'}
                    onClick={() => handleRedirect('account/settings')}
                  />
                </UserSideBar>
              </AccountContentContainer>
            </AccountContainer>
          </Wrapper>
        </Container>
      </DefaultLayout>
    </>
  );
};

export default Account;
