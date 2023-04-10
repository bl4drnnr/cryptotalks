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
import { ListPostsResponse } from '@services/posts/list-posts/list-posts.interface';
import { useListPostsService } from '@services/posts/list-posts/list-posts.service';
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
  ContactIcon,
  ContactInformationWrapper,
  LatestPostsContainer,
  NoPostsTitle,
  PostContainer,
  PostTitle,
  PostPreview, PostsTitle, PostSearchTags, PostTag
} from '@styles/account.style';

const Account = () => {
  const router = useRouter();

  const fetchTokenChecking = React.useRef(true);
  const { loading: l1, refreshToken } = useRefreshTokenService();
  const { loading: l2, listPosts } = useListPostsService();
  const { handleException } = useHandleException();
  const { showNotificationMessage } = useNotificationMessage();

  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(5);
  const [order, setOrder] = React.useState('ASC');
  const [orderBy, setOrderBy] = React.useState('createdAt');
  const [userData, setUserData] = React.useState<IPersonalInformation>();
  const [userPosts, setUserPosts] = React.useState<ListPostsResponse>();

  React.useEffect(() => {
    if (fetchTokenChecking.current) {
      fetchTokenChecking.current = false;
      const token = sessionStorage.getItem('_at');

      if (!token) {
        handleRedirect('/').then();
      } else {
        checkUser(token).then((res) => {
          if (res) {
            sessionStorage.setItem('_at', res._at);
            setUserData(res.user);

            fetchUserPosts(res.user.id).then((posts) => {
              setUserPosts(posts);
            });
          }
        });
      }
    }
  }, []);

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

  const exceptionHandler = async (e: any) => {
    handleException(e);
    sessionStorage.removeItem('_at');
    await handleRedirect('');
  };

  const checkUser = async (token: string) => {
    try {
      return await refreshToken({ token });
    } catch (e) {
      await exceptionHandler(e);
    }
  };

  const fetchUserPosts = async (userId: string) => {
    try {
      return await listPosts({
        page, pageSize, order, orderBy, userId
      });
    } catch (e) {
      await exceptionHandler(e);
    }
  };

  return (
    <>
      <Head>
        <title>Cryptotalks | My account</title>
      </Head>
      <DefaultLayout loading={l1 || l2}>
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
                    </UserProfilePictureWrapper>

                    <AccountInfoContainer>
                      <AccountInfo>
                        <Nickname>{userData.username}</Nickname>
                        <FullName>aka {userData.firstName} {userData.lastName}</FullName>
                      </AccountInfo>
                      <UserBio>{userData.bio}</UserBio>
                      <ContactInformationWrapper>
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
                      </ContactInformationWrapper>
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
                <LatestPostsContainer>
                  {userPosts?.rows.length ? (
                    <>
                      <PostsTitle>User latest posts</PostsTitle>
                      {userPosts?.rows.map((post, key) => (
                        <PostContainer key={key}>
                          <PostTitle>{post.title}</PostTitle>
                          <PostPreview>{post.preview}</PostPreview>
                          <PostSearchTags>
                            {post.searchTags.map((searchTag, postKey) => (
                              <PostTag key={postKey}>{searchTag}</PostTag>
                            ))}
                          </PostSearchTags>
                        </PostContainer>
                      ))}
                    </>
                  ) : (
                    <NoPostsTitle>
                      No posts yet.
                    </NoPostsTitle>
                  )}
                </LatestPostsContainer>
              </AccountContentContainer>
            </AccountContainer>
          </Wrapper>
        </Container>
      </DefaultLayout>
    </>
  );
};

export default Account;
