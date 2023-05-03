import React from 'react';

import dayjs from 'dayjs';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Input } from '@components/Input/Input.component';
import { useHandleException } from '@hooks/useHandleException.hook';
import { parseCoins } from '@hooks/useParseCoins.hook';
import { useNotificationMessage } from '@hooks/useShowNotificationMessage.hook';
import DefaultLayout from '@layouts/Default.layout';
import { useGetUserByUsernameService } from '@services/get-user-by-username/get-user-by-username.service';
import { IPersonalInformation } from '@services/get-user-settings/get-user-settings.interface';
import { ICoins } from '@services/list-crypto/list-crypto.interface';
import { useListFavoritesService } from '@services/list-favorites/list-favorites.service';
import { IPosts } from '@services/posts/list-posts/list-posts.interface';
import { useListPostsService } from '@services/posts/list-posts/list-posts.service';
import { NotificationType } from '@store/global/global.state';
import {
  AccountContainer,
  AccountCreatedAtContainer,
  AccountInfo,
  AccountInfoContainer,
  ContactField,
  ContactIcon,
  ContactInformationWrapper,
  Container, CreatedAtDate,
  CreatedAtParagraph,
  FullName,
  Nickname,
  UserBio,
  UserInfoContainer,
  UserProfilePicture,
  UserProfilePictureWrapper,
  UserTitle,
  Wrapper
} from '@styles/account.style';

const Username = () => {
  const router = useRouter();

  const { loading: l0, getUserByUsername } = useGetUserByUsernameService();
  const { loading: l1, listFavorites } = useListFavoritesService();
  const { loading: l2, listPosts } = useListPostsService();
  const { handleException } = useHandleException();
  const { showNotificationMessage } = useNotificationMessage();

  const [userData, setUserData] = React.useState<IPersonalInformation>();
  const [userNotFound, setUserNotFound] = React.useState<boolean>(false);

  const [listOfCrypto, setListOfCrypto] = React.useState<Array<ICoins>>();
  const [listOfPosts, setListOfPosts] = React.useState<Array<IPosts>>();

  const [cryptoPage, setCryptoPage] = React.useState(0);
  const [cryptoPageSize, setCryptoPageSize] = React.useState(5);
  const [cryptoTotalPages, setCryptoTotalPages] = React.useState(0);
  const [cryptoOrder, setCryptoOrder] = React.useState('ASC');
  const [cryptoOrderBy, setCryptoOrderBy] = React.useState('rank');
  const [cryptoSearchQuery, setCryptoSearchQuery] = React.useState('');
  const [cryptoCurrentSort, setCryptoCurrentSort] = React.useState({
    name: 'rank',
    value: 'Sort by rank'
  });
  const [cryptoSorts, setCryptoSorts] = React.useState([
    {
      name: 'name',
      value: 'Sort by name'
    }, {
      name: 'tier',
      value: 'Sort by tier'
    }, {
      name: 'rank',
      value: 'Sort by rank'
    }, {
      name: 'marketCap',
      value: 'Sort by cap'
    }
  ]);

  const [postsPage, setPostsPage] = React.useState(0);
  const [postsPageSize, setPostsPageSize] = React.useState(5);
  const [postsTotalPages, setPostsTotalPages] = React.useState(0);
  const [postsOrder, setPostsOrder] = React.useState('ASC');
  const [postsOrderBy, setPostsOrderBy] = React.useState('createdAt');
  const [postsSearchQuery, setPostsSearchQuery] = React.useState('');
  const [postsCurrentSort, setPostsCurrentSort] = React.useState({
    name: 'createdAt',
    value: 'Sort by creation date'
  });
  const [postsSorts, setPostsSorts] = React.useState([{
    name: 'createdAt',
    value: 'Sort by creation date'
  }, {
    name: 'rate',
    value: 'Sort by rate'
  }, {
    name: 'title',
    value: 'Sort by title'
  }]);

  React.useEffect(() => {
    const { username } = router.query;

    if (username) {
      fetchGetUserByUsername(username as string).then((res) => {
        setUserData(res?.userData);
        fetchListCrypto().then((cryptoRes: any) => {
          setCryptoTotalPages(cryptoRes.count);
          setListOfCrypto(cryptoRes.rows);
        });
        fetchListPosts().then();
      });
    }
  }, [router.query]);

  React.useEffect(() => {
    fetchListCrypto().then();
  }, [
    cryptoPage,
    cryptoPageSize,
    cryptoOrder,
    cryptoOrderBy,
    cryptoSearchQuery
  ]);

  React.useEffect(() => {
    fetchListPosts().then();
  }, [
    postsPage,
    postsPageSize,
    postsOrder,
    postsOrderBy,
    postsSearchQuery
  ]);

  const fetchGetUserByUsername = async (username: string) => {
    try {
      return await getUserByUsername({ username });
    } catch (e) {
      setUserNotFound(true);
      handleException(e);
    }
  };

  const fetchListPosts = async () => {
    try {
      const { rows, count } = await listPosts({
        page: postsPage,
        pageSize: postsPageSize,
        order: postsOrder,
        orderBy: postsOrderBy,
        searchQuery: postsSearchQuery,
        username: userData?.username
      });

      setListOfPosts(rows);
      setPostsTotalPages(count);
    } catch (e) {
      handleException(e);
    }
  };

  const fetchListCrypto = async () => {
    try {
      const { rows, count } = await listFavorites({
        page: cryptoPage,
        pageSize: cryptoPageSize,
        order: cryptoOrder,
        orderBy: cryptoOrderBy,
        userId: userData?.id
      });

      return { rows: parseCoins(rows), count };
    } catch (e) {
      handleException(e);
    }
  };

  const handleRedirect = async (path: string) => {
    return await router.push(path);
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    showNotificationMessage({
      type: NotificationType.SUCCESS,
      content: 'Copied to clipboard',
    });
  };

  return (
    <>
      <Head>
        <title>Cryptotalks | UsernameHere</title>
      </Head>
      <DefaultLayout loading={l0 || l1 || l2}>
        <Container>
          <Wrapper>
            <AccountContainer>
              <UserInfoContainer>
                {userData && (
                  <UserProfilePicture>
                    <UserProfilePictureWrapper>
                      {userData.isProfilePicPresent ? (
                        <Image
                          className={'ava'}
                          src={`${process.env.NEXT_PUBLIC_PUBLIC_S3_BUCKET_URL}/users-profile-pictures/${userData?.id}.png`}
                          alt={'ava'}
                          width={225}
                          height={225}
                        />
                      ) : (
                        <Image
                          className={'ava'}
                          src={`${process.env.NEXT_PUBLIC_PUBLIC_S3_BUCKET_URL}/testava.jpg`}
                          alt={'ava'}
                          width={225}
                          height={225}
                        />
                      )}

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
                              <Image
                                src={`${process.env.NEXT_PUBLIC_PUBLIC_S3_BUCKET_URL}/twitter.svg`}
                                width={32}
                                height={32}
                                alt={'t'}
                              />
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
                              <Image
                                src={`${process.env.NEXT_PUBLIC_PUBLIC_S3_BUCKET_URL}/linkedin.svg`}
                                width={32}
                                height={32}
                                alt={'l'}
                              />
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
                              <Image
                                src={`${process.env.NEXT_PUBLIC_PUBLIC_S3_BUCKET_URL}/tag.svg`}
                                width={32}
                                height={32}
                                alt={'w'}
                              />
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
            </AccountContainer>
          </Wrapper>
        </Container>
      </DefaultLayout>
    </>
  );
};

export default Username;
