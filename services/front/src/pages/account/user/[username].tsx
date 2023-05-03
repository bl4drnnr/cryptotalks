import React from 'react';

import dayjs from 'dayjs';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import CoinPreview from '@components/CoinPreview/CoinPreview.component';
import { Input } from '@components/Input/Input.component';
import Pagination from '@components/Pagination/Pagination.component';
import PostPreview from '@components/PostPreview/PostPreview.component';
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
  AccountContentContainer,
  AccountCreatedAtContainer,
  AccountInfo,
  AccountInfoContainer,
  ContactField,
  ContactIcon,
  ContactInformationWrapper,
  Container,
  CreatedAtDate,
  CreatedAtParagraph,
  FullName,
  LatestPostsContainer,
  Nickname,
  NoPostsTitle,
  PostsTitle,
  UserBio,
  UserContentSectionWrapper,
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
      fetchGetUserByUsername(username as string).then(() => {
        fetchListCrypto(username as string).then((cryptoRes: any) => {
          setCryptoTotalPages(cryptoRes.count);
          setListOfCrypto(cryptoRes.rows);
        });
        fetchListPosts(username as string).then();
      });
    }
  }, [router.query]);

  React.useEffect(() => {
    fetchListCrypto(userData?.username as string).then();
  }, [
    cryptoPage,
    cryptoPageSize,
    cryptoOrder,
    cryptoOrderBy,
    cryptoSearchQuery
  ]);

  React.useEffect(() => {
    fetchListPosts(userData?.username as string).then();
  }, [
    postsPage,
    postsPageSize,
    postsOrder,
    postsOrderBy,
    postsSearchQuery
  ]);

  const fetchGetUserByUsername = async (username: string) => {
    try {
      const { data } = await getUserByUsername({ username });
      setUserData(data);
      return;
    } catch (e) {
      setUserNotFound(true);
      handleException(e);
    }
  };

  const fetchListPosts = async (username: string) => {
    try {
      const { rows, count } = await listPosts({
        page: postsPage,
        pageSize: postsPageSize,
        order: postsOrder,
        orderBy: postsOrderBy,
        searchQuery: postsSearchQuery,
        username
      });

      setListOfPosts(rows);
      setPostsTotalPages(count);
    } catch (e) {
      handleException(e);
    }
  };

  const fetchListCrypto = async (username: string) => {
    try {
      const { rows, count } = await listFavorites({
        page: cryptoPage,
        pageSize: cryptoPageSize,
        order: cryptoOrder,
        orderBy: cryptoOrderBy,
        username
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

              <AccountContentContainer>
                <UserContentSectionWrapper>
                  <LatestPostsContainer>
                    {listOfPosts?.length ? (
                      <>
                        <PostsTitle>{userData?.username}&apos;s posts</PostsTitle>
                        {listOfPosts?.map((post, key) => (
                          <>
                            <PostPreview
                              slug={post.slug}
                              title={post.title}
                              preview={post.preview}
                              searchTags={post.searchTags}
                              createdAt={post.createdAt}
                              key={key}
                            />
                          </>
                        ))}
                        <Pagination
                          currentPage={postsPage + 1}
                          pageSize={postsPageSize}
                          onPageChange={setPostsPage}
                          onPageSizeChange={setPostsPageSize}
                          totalPages={Math.ceil(postsTotalPages / postsPageSize)}
                        />
                      </>
                    ) : (
                      <NoPostsTitle>
                        No posts yet.
                      </NoPostsTitle>
                    )}
                  </LatestPostsContainer>
                  <LatestPostsContainer>
                    {listOfCrypto?.length ? (
                      <>
                        <PostsTitle>{userData?.username}&apos;s favorite cryptos</PostsTitle>
                        {listOfCrypto?.map((item, index) => (
                          <CoinPreview
                            uuid={item.uuid}
                            iconUrl={item.iconUrl}
                            name={item.name}
                            symbol={item.symbol}
                            price={item.price}
                            change={item.change}
                            sparkline={item.sparkline}
                            width={150}
                            height={80}
                            key={index}
                          />
                        ))}
                        <Pagination
                          currentPage={cryptoPage + 1}
                          pageSize={cryptoPageSize}
                          onPageChange={setCryptoPage}
                          onPageSizeChange={setCryptoPageSize}
                          totalPages={Math.ceil(cryptoTotalPages / cryptoPageSize)}
                        />
                      </>
                    ): (
                      <NoPostsTitle>
                        No favorite coins yet.
                      </NoPostsTitle>
                    )}
                  </LatestPostsContainer>
                </UserContentSectionWrapper>
              </AccountContentContainer>
            </AccountContainer>
          </Wrapper>
        </Container>
      </DefaultLayout>
    </>
  );
};

export default Username;
