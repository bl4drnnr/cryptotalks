import React from 'react';

import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Line, LineChart, YAxis } from 'recharts';

import { Input } from '@components/Input/Input.component';
import { useHandleException } from '@hooks/useHandleException.hook';
import DefaultLayout from '@layouts/Default.layout';
import { useGetCryptoByIdService } from '@services/get-crypto-by-id/get-crypto-by-id.service';
import { GetStatsResponse } from '@services/get-stats/get-stats.interface';
import { useGetStatsService } from '@services/get-stats/get-stats.service';
import { ICoins, ListCryptoResponse } from '@services/list-crypto/list-crypto.interface';
import { useListCryptoService } from '@services/list-crypto/list-crypto.service';
import {
  Container, CryptoItem, CryptoItemSide, CryptoMetadata, CryptoName, CryptoNames, CryptoSymbol, MarketStatsBody,
  MarketStatsHeader, MarketStatsItem, MarketStatsRow,
  MarketStatsTable, MarketStatsTitle, SearchInputWrapper, SortBar, SortItem,
} from '@styles/market.style';


const Market = () => {
  const router = useRouter();

  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(5);
  const [order, setOrder] = React.useState('ASC');
  const [orderBy, setOrderBy] = React.useState('rank');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [listOfCrypto, setListOfCrypto] = React.useState<Array<ICoins>>();
  const [marketStats, setMarketStats] = React.useState<GetStatsResponse>();
  const [currentSort, setCurrentSort] = React.useState({
    name: 'name',
    value: 'Sort by name'
  });
  const [sorts, setSorts] = React.useState([
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

  const { handleException } = useHandleException();
  const { loading: l0, getStats } = useGetStatsService();
  const { loading: l1, getCryptoById  } = useGetCryptoByIdService();
  const { loading: l2, listCrypto } = useListCryptoService();

  const handleRedirect = async (path: string) => {
    await router.push(`/${path}`);
  };

  React.useEffect(() => {
    fetchGetMarketStats().then((marketStats) => {
      setMarketStats(marketStats);
    });

    fetchListCrypto().then();
  }, []);

  React.useEffect(() => {
    fetchListCrypto().then();
  }, [page, pageSize, order, orderBy, searchQuery]);

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
      const { rows } = await listCrypto({
        page, pageSize, order, orderBy, searchQuery
      });

      const parsedCoins = rows.map((item) => {
        const parsedSparklines = item.sparkline.map((item: any, index: number) => ({
          name: index.toString(),
          value: parseFloat(item).toFixed(8)
        }));
        return {
          ...item,
          sparkline: parsedSparklines,
          price: parseFloat(item.price).toFixed(4),
          marketCap: (parseFloat(item.marketCap) / 1000000000).toFixed(2),
          Volume24h: (parseFloat(item.Volume24h) / 1000000000).toFixed(2),
          btcPrice: parseFloat(item.btcPrice).toFixed(8)
        };
      });

      setListOfCrypto(parsedCoins);
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
        <Container>
          <SearchInputWrapper>
            <Input
              value={searchQuery}
              placeholder={'Search for coins'}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchInputWrapper>

          <SortBar>
            {sorts.map((item) => (
              <SortItem
                className={currentSort.name === item.name ? 'active': ''}
                key={item.name}
                onClick={() => setCurrentSort(item)}
              >
                {item.value}
              </SortItem>
            ))}
          </SortBar>

          <MarketStatsTitle>
            Market statistics for the last hour
          </MarketStatsTitle>

          <MarketStatsTable>
            <MarketStatsBody>
              <MarketStatsRow>
                <MarketStatsHeader>Total</MarketStatsHeader>
                <MarketStatsHeader>Total coins</MarketStatsHeader>
                <MarketStatsHeader>Total markets</MarketStatsHeader>
                <MarketStatsHeader>Total exchanges</MarketStatsHeader>
                <MarketStatsHeader>Total market cap</MarketStatsHeader>
                <MarketStatsHeader>Total 24H volume</MarketStatsHeader>
              </MarketStatsRow>
            </MarketStatsBody>
            <MarketStatsBody>
              <MarketStatsRow>
                <MarketStatsItem>{marketStats?.total}</MarketStatsItem>
                <MarketStatsItem>{marketStats?.totalCoins}</MarketStatsItem>
                <MarketStatsItem>{marketStats?.totalMarkets}</MarketStatsItem>
                <MarketStatsItem>{marketStats?.totalExchanges}</MarketStatsItem>
                <MarketStatsItem>{marketStats?.totalMarketCap}</MarketStatsItem>
                <MarketStatsItem>{marketStats?.total24hVolume}</MarketStatsItem>
              </MarketStatsRow>
            </MarketStatsBody>
          </MarketStatsTable>

          {listOfCrypto && (
            <>
              {listOfCrypto.map((item) =>
                <CryptoItem key={item.id}>

                  <CryptoItemSide className={'small-width'}>
                    <Image src={item.iconUrl} alt={item.name} width={48} height={48} />
                    <CryptoNames>
                      <CryptoSymbol>{item.symbol}</CryptoSymbol>
                      <CryptoName>{item.name}</CryptoName>
                    </CryptoNames>
                  </CryptoItemSide>

                  <CryptoItemSide>
                    <CryptoNames>
                      <CryptoSymbol>
                        Current price: {item.price} $
                      </CryptoSymbol>
                      <CryptoName>
                        Market cap: {item.marketCap} bln $
                      </CryptoName>
                    </CryptoNames>
                  </CryptoItemSide>

                  <CryptoItemSide className={'small-width'}>
                    <CryptoNames>
                      <CryptoSymbol>
                        Tier: {item.tier}
                      </CryptoSymbol>
                      <CryptoName>
                        Rank: {item.rank}
                      </CryptoName>
                    </CryptoNames>
                  </CryptoItemSide>

                  <CryptoItemSide>
                    <CryptoNames>
                      <CryptoMetadata>
                        24H Volume: {item.Volume24h} bln $
                      </CryptoMetadata>
                      <CryptoMetadata>
                        BTC Price: {item.btcPrice}
                      </CryptoMetadata>
                      <CryptoMetadata>
                        Asset change (%): {item.change}
                      </CryptoMetadata>
                    </CryptoNames>
                  </CryptoItemSide>

                  <LineChart
                    width={300}
                    height={80}
                    data={item.sparkline}
                  >
                    <YAxis
                      hide={true}
                      type={'number'}
                      domain={[
                        Math.min(...item.sparkline.map((o: any) => o.value)),
                        Math.max(...item.sparkline.map((o: any) => o.value))
                      ]} />
                    <Line
                      dataKey="value"
                      stroke={item.change > 0 ? 'rgb(59, 232, 59)': 'rgb(255, 51, 51)'}
                    />
                  </LineChart>

                </CryptoItem>
              )}
            </>
          )}

        </Container>
      </DefaultLayout>
    </>
  );
};

export default Market;
