import React from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { useHandleException } from '@hooks/useHandleException.hook';
import DefaultLayout from '@layouts/Default.layout';
import { useAddCryptoToFavoritesService } from '@services/add-crypto-to-favorites/add-crypto-to-favorites.service';
import { useGetCryptoByIdService } from '@services/get-crypto-by-id/get-crypto-by-id.service';
import {
  useRemoveCryptoFromFavoritesService
} from '@services/remove-crypto-from-favorites/remove-crypto-from-favorites.service';
import { Container } from '@styles/coin.style';

const Coin = () => {
  const router = useRouter();

  const { handleException } = useHandleException();
  const { loading: l0, getCryptoById } = useGetCryptoByIdService();
  const { loading: l1, addCryptoToFavorite } = useAddCryptoToFavoritesService();
  const { loading: l2, removeCryptoFromFavorites } = useRemoveCryptoFromFavoritesService();

  const [currentCrypto, setCurrentCrypto] = React.useState();

  React.useEffect(() => {
    const { cryptoUuid } = router.query;
    if (cryptoUuid) {
      fetchGetCoin(cryptoUuid as string)
        .then((res) => {

        });
    }
  }, [router.query]);

  const fetchGetCoin = async (cryptoId: string) => {
    try {
      return await getCryptoById({ cryptoId });
    } catch (e) {
      handleException(e);
    }
  };

  const fetchAddCryptoToFavorite = async () => {
    try {
      return await addCryptoToFavorite({ token: '', cryptoId: '' })
    } catch (e) {
      handleException(e);
    }
  };

  const fetchRemoveCryptoFromFavorites = async () => {
    try {
      return await removeCryptoFromFavorites({ token: '', cryptoId: '' })
    } catch (e) {
      handleException(e)
    }
  };

  const handleRedirect = async (path: string) => {
    await router.push(path);
  };

  return (
    <>
      <Head>
        <title>Cryptotalks | </title>
      </Head>
      <DefaultLayout loading={l0 || l1 || l2}>
        <Container></Container>
      </DefaultLayout>
    </>
  );
};

export default Coin;
