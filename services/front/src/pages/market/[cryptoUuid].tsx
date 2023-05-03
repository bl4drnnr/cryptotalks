import React from 'react';

import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

import { Button } from '@components/Button/Button.component';
import PostPreview from '@components/PostPreview/PostPreview.component';
import { useHandleException } from '@hooks/useHandleException.hook';
import { parseCoins } from '@hooks/useParseCoins.hook';
import { useNotificationMessage } from '@hooks/useShowNotificationMessage.hook';
import DefaultLayout from '@layouts/Default.layout';
import { useAddCryptoToFavoritesService } from '@services/add-crypto-to-favorites/add-crypto-to-favorites.service';
import { GetCryptoByIdResponse } from '@services/get-crypto-by-id/get-crypto-by-id.interface';
import { useGetCryptoByIdService } from '@services/get-crypto-by-id/get-crypto-by-id.service';
import { ListPostsResponse } from '@services/posts/list-posts/list-posts.interface';
import { useListPostsService } from '@services/posts/list-posts/list-posts.service';
import {
  useRemoveCryptoFromFavoritesService
} from '@services/remove-crypto-from-favorites/remove-crypto-from-favorites.service';
import { NotificationType } from '@store/global/global.state';
import {
  CoinLink,
  CoinMarketDataWrapper,
  CoinParagraph,
  CoinSubtitle,
  CoinTable,
  CoinTableBody,
  CoinTableRec,
  CoinTableRow,
  CoinTitle,
  CoinTitles,
  CoinTitleWrapper,
  CoinWrapper,
  Container
} from '@styles/coin.style';

const Coin = () => {
  const router = useRouter();

  const { handleException } = useHandleException();
  const { showNotificationMessage } = useNotificationMessage();
  const { loading: l0, getCryptoById } = useGetCryptoByIdService();
  const { loading: l1, addCryptoToFavorite } = useAddCryptoToFavoritesService();
  const { loading: l2, removeCryptoFromFavorites } = useRemoveCryptoFromFavoritesService();
  const { loading: l3, listPosts } = useListPostsService();

  const [currentCrypto, setCurrentCrypto] = React.useState<GetCryptoByIdResponse>();
  const [relatedPosts, setRelatedPosts] = React.useState<ListPostsResponse>();
  const [tokenPersistent, setTokenPersistent] = React.useState<boolean>(false);
  const [isFavoriteCoin, setIsFavoriteCoin] = React.useState<boolean>(false);

  React.useEffect(() => {
    const token = localStorage.getItem('_at');
    setTokenPersistent(!!token);
    const { cryptoUuid } = router.query;
    if (cryptoUuid) {
      fetchGetCoin(cryptoUuid as string).then((res: any) => {
        setCurrentCrypto(res);
        setIsFavoriteCoin(res?.isFavorite);
        fetchListPosts(res?.symbol).then((posts) => setRelatedPosts(posts));
      });
    }
  }, [router.query]);

  const fetchGetCoin = async (cryptoId: string) => {
    try {
      const token = localStorage.getItem('_at');
      const coin = await getCryptoById({ cryptoId, token });
      return parseCoins(coin);
    } catch (e) {
      handleException(e);
    }
  };

  const fetchAddCryptoToFavorite = async (cryptoId: string | undefined) => {
    try {
      const token = localStorage.getItem('_at');
      await addCryptoToFavorite({ token, cryptoId });
      showNotificationMessage({
        type: NotificationType.SUCCESS,
        content: 'Coin has been successfully added to favorite'
      });
      setIsFavoriteCoin(true);
    } catch (e) {
      handleException(e);
    }
  };

  const fetchRemoveCryptoFromFavorites = async (cryptoId: string | undefined) => {
    try {
      const token = localStorage.getItem('_at');

      await removeCryptoFromFavorites({ token, cryptoId });

      showNotificationMessage({
        type: NotificationType.SUCCESS,
        content: 'Coin has been successfully removed from favorite'
      });

      setIsFavoriteCoin(false);
    } catch (e) {
      handleException(e);
    }
  };

  const fetchListPosts = async (coinName: string) => {
    try {
      return await listPosts({
        page: 0,
        pageSize: 5,
        order: 'DESC',
        orderBy: 'createdAt',
        searchQuery: coinName
      });
    } catch (e) {
      handleException(e);
    }
  };

  const handleRedirect = async (path: string) => {
    await router.push(`${path}`);
  };

  return (
    <>
      <Head>
        <title>Cryptotalks | {currentCrypto?.name}</title>
      </Head>
      <DefaultLayout loading={l0 || l1 || l2 || l3}>
        <Container>
          {currentCrypto ? (
            <>
              <CoinTitleWrapper>
                <CoinWrapper>
                  <Image src={currentCrypto?.iconUrl as string} alt={currentCrypto?.name || 'crypto'} width={128} height={128} />
                  <CoinTitles>
                    <CoinTitle>{currentCrypto?.name}</CoinTitle>
                    <CoinSubtitle>{currentCrypto?.symbol}</CoinSubtitle>
                  </CoinTitles>
                </CoinWrapper>

                <CoinWrapper className={'vertical-center'}>
                  {tokenPersistent ? (
                    (isFavoriteCoin ? (
                      <Button
                        onClick={() => fetchRemoveCryptoFromFavorites(currentCrypto?.uuid)}
                        text={'Remove from favorites'}
                      />
                    ) : (
                      <Button
                        onClick={() => fetchAddCryptoToFavorite(currentCrypto?.uuid)}
                        text={'Add to favorites'}
                      />
                    ))
                  ) : (
                    <CoinParagraph>
                      Like this one? <CoinLink
                      onClick={() => handleRedirect('/signup')}
                    >Add to favorite!</CoinLink>
                    </CoinParagraph>
                  )}
                </CoinWrapper>
              </CoinTitleWrapper>

              <CoinSubtitle className={'subsubtitle'}>
                Description
              </CoinSubtitle>
              <CoinParagraph dangerouslySetInnerHTML={{ __html: currentCrypto?.description as string }} />


              <CoinMarketDataWrapper>
                <CoinTitles>
                  <CoinSubtitle className={'subsubtitle'}>
                    Coin market price
                  </CoinSubtitle>
                  {currentCrypto ? (
                    <LineChart width={600} height={300} data={currentCrypto?.sparkline}>
                      <XAxis dataKey="date" />
                      <YAxis
                        domain={[
                          // @ts-ignore
                          Math.min(currentCrypto?.sparkline.map((o: any) => o.value)),
                          // @ts-ignore
                          Math.max(currentCrypto?.sparkline.map((o: any) => o.value))
                        ]}
                      />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#8884d8"
                      />
                      <Line
                        type="monotone"
                        dataKey={currentCrypto?.name}
                        stroke="#8884d8"
                      />
                      <Legend verticalAlign="top" />
                    </LineChart>
                  ) : (
                    <CoinTitle>
                      Something went wrong, probably you should try later :(
                    </CoinTitle>
                  )}
                </CoinTitles>
                <CoinTitles>
                  <CoinSubtitle className={'subsubtitle'}>
                    Coin market data
                  </CoinSubtitle>
                  <CoinTable>
                    <CoinTableBody>
                      <CoinTableRow>
                        <CoinTableRec>Price</CoinTableRec>
                        <CoinTableRec>{currentCrypto?.price} USD</CoinTableRec>
                      </CoinTableRow>
                      <CoinTableRow>
                        <CoinTableRec>BTC price</CoinTableRec>
                        <CoinTableRec>{currentCrypto?.btcPrice}</CoinTableRec>
                      </CoinTableRow>
                      <CoinTableRow>
                        <CoinTableRec>Change</CoinTableRec>
                        <CoinTableRec>{currentCrypto?.change} %</CoinTableRec>
                      </CoinTableRow>
                      <CoinTableRow>
                        <CoinTableRec>Market cap</CoinTableRec>
                        <CoinTableRec>{currentCrypto?.marketCap} mld $</CoinTableRec>
                      </CoinTableRow>
                      <CoinTableRow>
                        <CoinTableRec>Tier</CoinTableRec>
                        <CoinTableRec>{currentCrypto?.tier}</CoinTableRec>
                      </CoinTableRow>
                      <CoinTableRow>
                        <CoinTableRec>Rank</CoinTableRec>
                        <CoinTableRec>{currentCrypto?.rank}</CoinTableRec>
                      </CoinTableRow>
                    </CoinTableBody>
                  </CoinTable>
                </CoinTitles>
              </CoinMarketDataWrapper>

              {relatedPosts?.count ? (
                <>
                  <CoinSubtitle className={'subsubtitle'}>
                    Related posts
                  </CoinSubtitle>
                  {relatedPosts?.rows.map((post, index) => (
                    <PostPreview
                      rates={post.rates}
                      key={index}
                      slug={post.slug}
                      title={post.title}
                      preview={post.preview}
                      searchTags={post.searchTags}
                    />
                  ))}
                </>
              ) : (<></>)}
            </>
          ) : (
            <CoinTitle>
              Something went wrong, probably you should try later :(
            </CoinTitle>
          )}
        </Container>
      </DefaultLayout>
    </>
  );
};

export default Coin;
