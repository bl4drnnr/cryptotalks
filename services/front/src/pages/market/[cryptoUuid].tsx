import React from 'react';

import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Button } from '@components/Button/Button.component';
import { useHandleException } from '@hooks/useHandleException.hook';
import DefaultLayout from '@layouts/Default.layout';
import { useAddCryptoToFavoritesService } from '@services/add-crypto-to-favorites/add-crypto-to-favorites.service';
import { GetCryptoByIdResponse } from '@services/get-crypto-by-id/get-crypto-by-id.interface';
import { useGetCryptoByIdService } from '@services/get-crypto-by-id/get-crypto-by-id.service';
import {
  useRemoveCryptoFromFavoritesService
} from '@services/remove-crypto-from-favorites/remove-crypto-from-favorites.service';
import {
  CoinParagraph,
  CoinSubtitle,
  CoinTitle,
  CoinTitles,
  CoinTitleWrapper,
  CoinWrapper,
  Container
} from '@styles/coin.style';

const Coin = () => {
  const router = useRouter();

  const { handleException } = useHandleException();
  const { loading: l0, getCryptoById } = useGetCryptoByIdService();
  const { loading: l1, addCryptoToFavorite } = useAddCryptoToFavoritesService();
  const { loading: l2, removeCryptoFromFavorites } = useRemoveCryptoFromFavoritesService();

  const [currentCrypto, setCurrentCrypto] = React.useState<GetCryptoByIdResponse>();

  React.useEffect(() => {
    const { cryptoUuid } = router.query;
    if (cryptoUuid) {
      fetchGetCoin(cryptoUuid as string).then((res) => setCurrentCrypto(res));
    }
  }, [router.query]);

  const fetchGetCoin = async (cryptoId: string) => {
    try {
      return await getCryptoById({ cryptoId });
    } catch (e) {
      handleException(e);
    }
  };

  const fetchAddCryptoToFavorite = async (token: string, cryptoId: string) => {
    try {
      return await addCryptoToFavorite({ token, cryptoId });
    } catch (e) {
      handleException(e);
    }
  };

  const fetchRemoveCryptoFromFavorites = async (token: string, cryptoId: string) => {
    try {
      return await removeCryptoFromFavorites({ token, cryptoId });
    } catch (e) {
      handleException(e);
    }
  };

  const handleRedirect = async (path: string) => {
    await router.push(path);
  };

  return (
    <>
      <Head>
        <title>Cryptotalks | {currentCrypto?.name}</title>
      </Head>
      <DefaultLayout loading={l0 || l1 || l2}>
        <Container>
          <CoinTitleWrapper>
            <CoinWrapper>
              <Image src={currentCrypto?.iconUrl as string} alt={currentCrypto?.name || 'crypto'} width={128} height={128} />
              <CoinTitles>
                <CoinTitle>{currentCrypto?.name}</CoinTitle>
                <CoinSubtitle>{currentCrypto?.symbol}</CoinSubtitle>
              </CoinTitles>
            </CoinWrapper>

            <CoinWrapper className={'vertical-center'}>
              <Button text={'Add to favorites'}/>
            </CoinWrapper>
          </CoinTitleWrapper>

          <CoinSubtitle className={'subsubtitle'}>
            Description
          </CoinSubtitle>
          <CoinParagraph dangerouslySetInnerHTML={{ __html: currentCrypto?.description as string }} />

          <CoinSubtitle className={'subsubtitle'}>
            Last 24H information
          </CoinSubtitle>

          <CoinSubtitle className={'subsubtitle'}>
            Historical data
          </CoinSubtitle>

          <CoinSubtitle className={'subsubtitle'}>
            Related posts
          </CoinSubtitle>
        </Container>
      </DefaultLayout>
    </>
  );
};

export default Coin;
