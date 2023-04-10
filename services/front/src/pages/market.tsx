import React from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { useHandleException } from '@hooks/useHandleException.hook';
import DefaultLayout from '@layouts/Default.layout';
import { useGetCryptoByIdService } from '@services/get-crypto-by-id/get-crypto-by-id.service';
import { GetStatsResponse } from '@services/get-stats/get-stats.interface';
import { useGetStatsService } from '@services/get-stats/get-stats.service';
import { useListCryptoService } from '@services/list-crypto/list-crypto.service';

const Market = () => {
  const router = useRouter();

  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(5);
  const [order, setOrder] = React.useState('ASC');
  const [orderBy, setOrderBy] = React.useState('createdAt');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [listOfCrypto, setListOfCrypto] = React.useState([]);
  const [marketStats, setMarketStats] = React.useState<GetStatsResponse>();

  const { handleException } = useHandleException();
  const { loading: l0, getStats } = useGetStatsService();
  const { loading: l1, getCryptoById  } = useGetCryptoByIdService();
  const { loading: l2, listCrypto } = useListCryptoService();

  const handleRedirect = async (path: string) => {
    await router.push(`/${path}`);
  };

  React.useEffect(() => {
    fetchGetMarketStats().then((res) => {
      setMarketStats(res);
    });
  }, []);

  const fetchGetMarketStats = async () => {
    try {
      return await getStats();
    } catch (e) {
      handleException(e);
    }
  };

  const fetchGetCryptoById = async (cryptoId: string) => {
    try {
      return await getCryptoById({ cryptoId });
    } catch (e) {
      handleException(e);
    }
  };

  const fetchListCrypto = async () => {
    try {
      return await listCrypto({
        page, pageSize, order, orderBy, searchQuery
      });
    } catch (e) {
      await handleException(e);
    }
  };

  return (
    <>
      <Head>
        <title>Cryptotalks | Markets</title>
      </Head>
      <DefaultLayout loading={l0 || l1 || l2}>
        <>
          {JSON.stringify(marketStats)}
        </>
      </DefaultLayout>
    </>
  );
};

export default Market;
