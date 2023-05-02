import React from 'react';

import dayjs from 'dayjs';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Button } from '@components/Button/Button.component';
import CoinPreview from '@components/CoinPreview/CoinPreview.component';
import { Input } from '@components/Input/Input.component';
import { Modal } from '@components/Modal/Modal.component';
import Pagination from '@components/Pagination/Pagination.component';
import PostPreview from '@components/PostPreview/PostPreview.component';
import { TwoFa } from '@components/TwoFa/TwoFa.component';
import { useHandleException } from '@hooks/useHandleException.hook';
import { useNotificationMessage } from '@hooks/useShowNotificationMessage.hook';
import DefaultLayout from '@layouts/Default.layout';
import { IPersonalInformation } from '@services/get-user-settings/get-user-settings.interface';
import { ICoins } from '@services/list-crypto/list-crypto.interface';
import { useListFavoritesService } from '@services/list-favorites/list-favorites.service';
import { useDeletePostService } from '@services/posts/delete-post/delete-post.service';
import { IPosts } from '@services/posts/list-posts/list-posts.interface';
import { useListPostsService } from '@services/posts/list-posts/list-posts.service';
import { useRefreshTokenService } from '@services/refresh-tokens/refresh-tokens.service';
import {
  useRemoveCryptoFromFavoritesService
} from '@services/remove-crypto-from-favorites/remove-crypto-from-favorites.service';
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
  UserInfoContainer,
  UserProfilePicture,
  UserProfilePictureWrapper,
  UserSideBar,
  UserTitle,
  Wrapper,
} from '@styles/account.style';
import { ModalButtonWrapper } from '@styles/SecuritySettings.style';

const Account = () => {
  const router = useRouter();

  const fetchTokenChecking = React.useRef(true);
  const { loading: l1, refreshToken } = useRefreshTokenService();
  const { loading: l2, listPosts } = useListPostsService();
  const { loading: l3, listFavorites } = useListFavoritesService();
  const { loading: l4, deletePost } = useDeletePostService();
  const { loading: l5, removeCryptoFromFavorites } = useRemoveCryptoFromFavoritesService();
  const { handleException } = useHandleException();
  const { showNotificationMessage } = useNotificationMessage();

  const [userData, setUserData] = React.useState<IPersonalInformation>();
  const [userPosts, setUserPosts] = React.useState<Array<IPosts>>([]);
  const [favoriteCrypto, setFavoriteCrypto] = React.useState<Array<ICoins>>([]);

  const [cryptoPage, setCryptoPage] = React.useState(0);
  const [cryptoPageSize, setCryptoPageSize] = React.useState(5);
  const [cryptoTotalPages, setCryptoTotalPages] = React.useState<number>(0);

  const [postsPage, setPostsPage] = React.useState(0);
  const [postsPageSize, setPostsPageSize] = React.useState(5);
  const [postsTotalPages, setPostsTotalPages] = React.useState<number>(0);

  const [deletePostModal, setDeletePostModal] = React.useState<boolean>(false);
  const [deletePostStep, setDeletePostStep] = React.useState<number>(1);
  const [deletePostTwoFa, setDeletePostTwoFa] = React.useState('');
  const [deletePostCode, setDeletePostCode] = React.useState('');

  React.useEffect(() => {
    if (fetchTokenChecking.current) {
      fetchTokenChecking.current = false;
      const token = localStorage.getItem('_at');

      if (!token) {
        handleRedirect('/').then();
      } else {
        fetchCheckUser(token).then((res) => {
          if (res) {
            localStorage.setItem('_at', res._at);
            setUserData(res.user);

            fetchUserPosts().then();
            fetchUserCryptocurrencies().then();
          }
        });
      }
    }
  }, []);

  React.useEffect(() => {
    fetchUserCryptocurrencies().then();
  }, [cryptoPage, cryptoPageSize]);

  React.useEffect(() => {
    fetchUserPosts().then();
  }, [postsPage, postsPageSize]);

  const parseCoins = (listOfCoins: Array<ICoins>) => {
    return listOfCoins.map((item) => {
      const sparklineLength = item.sparkline.length;
      const parsedSparklines = item.sparkline.map((item: any, index: number) => ({
        date: dayjs().subtract(sparklineLength - index, 'hours').format('hh'),
        price: parseFloat(item).toFixed(8)
      }));
      return {
        ...item,
        sparkline: parsedSparklines,
        price: parseFloat(item.price).toFixed(2),
        marketCap: (parseFloat(item.marketCap) / 1000000000).toFixed(2),
        volume24h: (parseFloat(item.volume24h) / 1000000000).toFixed(2),
        btcPrice: parseFloat(item.btcPrice).toFixed(8)
      };
    });
  };
  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    showNotificationMessage({
      type: NotificationType.SUCCESS,
      content: 'Copied to clipboard',
    });
  };

  const handleRedirect = async (path: string) => {
    await router.push(path);
  };

  const exceptionHandler = async (e: any) => {
    handleException(e);
    localStorage.removeItem('_at');
    await handleRedirect('/');
  };

  const fetchCheckUser = async (token: string) => {
    try {
      return await refreshToken({ token });
    } catch (e) {
      await exceptionHandler(e);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const token = localStorage.getItem('_at');

      const { rows, count } = await listPosts({
        page: postsPage,
        pageSize: postsPageSize,
        order: 'DESC',
        orderBy: 'createdAt',
        token
      });

      setUserPosts(rows);
      setPostsTotalPages(count);

      return;
    } catch (e) {
      await exceptionHandler(e);
    }
  };

  const fetchUserCryptocurrencies = async () => {
    try {
      const token = localStorage.getItem('_at');

      const { rows, count } = await listFavorites({
        page: cryptoPage,
        pageSize: cryptoPageSize,
        order: 'DESC',
        orderBy: 'createdAt',
        token
      });

      setFavoriteCrypto(parseCoins(rows));
      setCryptoTotalPages(count);
      return;
    } catch (e) {
      await exceptionHandler(e);
    }
  };

  const fetchDeletePost = async (postId: string) => {
    try {
      const token = localStorage.getItem('_at');
      const { message } = await deletePost({
        token,
        postId,
        twoFaCode: deletePostTwoFa,
        code: deletePostCode
      });

      if (message === 'two-fa-required') {
        return setDeletePostStep(2);
      } else if (message === 'phone-two-fa-required') {
        return setDeletePostStep(3);
      }

      await fetchUserPosts();
      setDeletePostModal(false);

      showNotificationMessage({
        type: NotificationType.SUCCESS,
        content: 'Post has been successfully deleted'
      });

      return;
    } catch (e) {
      await exceptionHandler(e);
    }
  };

  const fetchRemoveCoinFromFavorites = async (cryptoId: string | undefined) => {
    try {
      const token = localStorage.getItem('_at');

      await removeCryptoFromFavorites({ token, cryptoId });

      await fetchUserCryptocurrencies();

      showNotificationMessage({
        type: NotificationType.SUCCESS,
        content: 'Coin has been successfully removed'
      });

      return;
    } catch (e) {
      await exceptionHandler(e);
    }
  };

  return (
    <>
      <Head>
        <title>Cryptotalks | My account</title>
      </Head>
      <DefaultLayout loading={l1 || l2 || l3 || l4 || l5}>
        <Container>
          <Wrapper>
            <AccountContainer>
              <UserInfoContainer>
                {userData && (
                  <UserProfilePicture>
                    <UserProfilePictureWrapper>
                      <Image
                        className={'ava'}
                        src={`${process.env.NEXT_PUBLIC_PUBLIC_S3_BUCKET_URL}/testava.jpg`}
                        alt={'ava'}
                        width={225}
                        height={225}
                      />
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
                <UserSideBar>
                  <Button
                    text={'Edit my profile'}
                    onClick={() => handleRedirect('/account/settings')}
                  />
                </UserSideBar>
                <div>
                  <LatestPostsContainer>
                    {userPosts?.length ? (
                      <>
                        <PostsTitle>Your posts</PostsTitle>
                        {userPosts?.map((post, key) => (
                          <>
                            <PostPreview
                              slug={post.slug}
                              title={post.title}
                              preview={post.preview}
                              searchTags={post.searchTags}
                              createdAt={post.createdAt}
                              key={key}
                              isAdmin={true}
                              onDeleteClick={() => setDeletePostModal(true)}
                            />
                            {deletePostModal ? (
                              <Modal
                                key={post.id}
                                onClose={() => setDeletePostModal(false)}
                                header={'Delete post?'}
                                description={'Be careful! This action cannot be proceed back. It means you will not be able to restore post, comments and rates. Are you sure you want to continue?'}
                              >
                                {deletePostStep === 1 ? (
                                  <Button
                                    onWhite={true}
                                    onClick={() => fetchDeletePost(post.id)}
                                    text={'Continue'}
                                  />
                                ) : (<></>)}
                                {deletePostStep === 2 ? (
                                  <>
                                    <TwoFa
                                      styles={{ justifyCenter: true, onWhite: true }}
                                      title={'Provide 2FA code from authenticator application'}
                                      setTwoFaCode={setDeletePostTwoFa}
                                    />
                                    <ModalButtonWrapper>
                                      <Button
                                        onWhite={true}
                                        disabled={deletePostTwoFa.length !== 6}
                                        onClick={() => fetchDeletePost(post.id)}
                                        text={'Submit'}
                                      />
                                    </ModalButtonWrapper>
                                  </>
                                ) : (deletePostStep === 3 ? (
                                  <>
                                    <TwoFa
                                      styles={{ justifyCenter: true, onWhite: true }}
                                      title={'Provide 2FA code from SMS'}
                                      setTwoFaCode={setDeletePostCode}
                                    />
                                    <ModalButtonWrapper>
                                      <Button
                                        onWhite={true}
                                        disabled={deletePostCode.length !== 6}
                                        onClick={() => fetchDeletePost(post.id)}
                                        text={'Submit'}
                                      />
                                    </ModalButtonWrapper>
                                  </>
                                ) : (<></>))}
                              </Modal>
                            ) : null}
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
                    {favoriteCrypto.length ? (
                      <>
                        <PostsTitle>Your favorite cryptos</PostsTitle>
                        {favoriteCrypto.map((item, index) => (
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
                            isAdmin={true}
                            onDeleteClick={() => fetchRemoveCoinFromFavorites(item.uuid)}
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
                </div>
              </AccountContentContainer>
            </AccountContainer>
          </Wrapper>
        </Container>
      </DefaultLayout>
    </>
  );
};

export default Account;
