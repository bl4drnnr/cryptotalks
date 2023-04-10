import React from 'react';

import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Line, LineChart, YAxis } from 'recharts';

import { Input } from '@components/Input/Input.component';
import Pagination from '@components/Pagination/Pagination.component';
import { useWindowDimensions } from '@hooks/useGetWindowDimensions.hook';
import { useHandleException } from '@hooks/useHandleException.hook';
import DefaultLayout from '@layouts/Default.layout';
import { GetStatsResponse } from '@services/get-stats/get-stats.interface';
import { useGetStatsService } from '@services/get-stats/get-stats.service';
import { ICoins } from '@services/list-crypto/list-crypto.interface';
import { useListCryptoService } from '@services/list-crypto/list-crypto.service';
import {
  Container,
  CryptoItem,
  CryptoItemSide,
  CryptoMetadata,
  CryptoName,
  CryptoNames,
  CryptoSymbol,
  LineChartWrapper,
  MarketParagraph,
  MarketStatsBody,
  MarketStatsHeader,
  MarketStatsItem,
  MarketStatsRow,
  MarketStatsTable,
  MarketTitle,
  SearchInputWrapper,
  SortBar,
  SortItem,
  SortWrapper,
  TypeOfSortItem
} from '@styles/market.style';


const Market = () => {
  const router = useRouter();

  const { width } = useWindowDimensions();

  const [showMobileTable, setShowMobileTable] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(5);
  const [order, setOrder] = React.useState('ASC');
  const [orderBy, setOrderBy] = React.useState('rank');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [listOfCrypto, setListOfCrypto] = React.useState<Array<ICoins>>();
  const [marketStats, setMarketStats] = React.useState<GetStatsResponse>();
  const [currentSort, setCurrentSort] = React.useState({
    name: 'rank',
    value: 'Sort by rank'
  });
  const [sorts, _] = React.useState([
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
  const { loading: l1, listCrypto } = useListCryptoService();

  const handleRedirect = async (path: string) => {
    await router.push(`/${path}`);
  };

  React.useEffect(() => {
    setOrderBy(currentSort.name);
  }, [currentSort]);

  React.useEffect(() => {
    if (width) setShowMobileTable(width <= 800);
  }, [width]);

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
      <DefaultLayout loading={l0 || l1}>
        <Container>

          <MarketTitle className={'main'}>Markets</MarketTitle>

          <MarketParagraph>
            Welcome to our cryptocurrency rate tracker! Here, you can stay up-to-date with the latest rates of various cryptocurrencies. Whether you're a seasoned investor, a crypto enthusiast, or just curious about the current market trends, our web page provides you with a comprehensive and user-friendly platform to explore the ever-changing world of cryptocurrencies.
          </MarketParagraph>
          <MarketParagraph>
            On our web page, you can easily access real-time rates of popular cryptocurrencies such as Bitcoin (BTC), Ethereum (ETH), Ripple (XRP), Litecoin (LTC), and many more. Our rates are updated in real-time to ensure you have the most accurate and reliable information at your fingertips.
          </MarketParagraph>
          <MarketParagraph>
            In addition to providing the latest rates, we also offer detailed information about each cryptocurrency, including its historical price data, market cap, trading volume, and other key metrics. You can also view interactive price charts that allow you to track the performance of your favorite cryptocurrencies over different timeframes, from minutes to years.
          </MarketParagraph>
          <MarketParagraph>
            Our web page is designed to be user-friendly, with a sleek and modern interface that makes it easy to navigate and find the information you need. You can customize your experience by selecting your preferred currency, time zone, and display options, allowing you to personalize the data to suit your needs.
          </MarketParagraph>
          <MarketParagraph>
            Whether you're a seasoned trader, a long-term investor, or just interested in learning more about cryptocurrencies, our web page provides you with a reliable and comprehensive resource to stay informed and make informed decisions. Stay ahead of the market with our cryptocurrency rate tracker and empower yourself with the knowledge to navigate the exciting world of digital currencies. Start exploring now!
          </MarketParagraph>

          <SearchInputWrapper>
            <Input
              value={searchQuery}
              placeholder={'Search for coins'}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchInputWrapper>

          <SortWrapper>
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
            <TypeOfSortItem
              onClick={() => setOrder(order === 'ASC' ? 'DESC' : 'ASC')}
            >
              {order}
            </TypeOfSortItem>
          </SortWrapper>

          <MarketTitle>
            Market statistics for the last hour
          </MarketTitle>

          {showMobileTable ? (
            <MarketStatsTable>
              <MarketStatsBody>
                <MarketStatsHeader>Total</MarketStatsHeader>
              </MarketStatsBody>
              <MarketStatsBody>
                <MarketStatsItem>{marketStats?.total}</MarketStatsItem>
              </MarketStatsBody>
              <MarketStatsBody>
                <MarketStatsHeader>Total coins</MarketStatsHeader>
              </MarketStatsBody>
              <MarketStatsBody>
                <MarketStatsItem>{marketStats?.totalCoins}</MarketStatsItem>
              </MarketStatsBody>
              <MarketStatsBody>
                <MarketStatsHeader>Total markets</MarketStatsHeader>
              </MarketStatsBody>
              <MarketStatsBody>
                <MarketStatsItem>{marketStats?.totalMarkets}</MarketStatsItem>
              </MarketStatsBody>
              <MarketStatsBody>
                <MarketStatsHeader>Total exchanges</MarketStatsHeader>
              </MarketStatsBody>
              <MarketStatsBody>
                <MarketStatsItem>{marketStats?.totalExchanges}</MarketStatsItem>
              </MarketStatsBody>
              <MarketStatsBody>
                <MarketStatsHeader>Total market cap</MarketStatsHeader>
              </MarketStatsBody>
              <MarketStatsBody>
                <MarketStatsItem>{marketStats?.totalMarketCap}</MarketStatsItem>
              </MarketStatsBody>
              <MarketStatsBody>
                <MarketStatsHeader>Total 24H volume</MarketStatsHeader>
              </MarketStatsBody>
              <MarketStatsBody>
                <MarketStatsItem>{marketStats?.total24hVolume}</MarketStatsItem>
              </MarketStatsBody>
            </MarketStatsTable>
            ) : (
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
          )}

          <MarketTitle>
            Cryptocurrencies
          </MarketTitle>

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

                  <LineChartWrapper>
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
                  </LineChartWrapper>

                </CryptoItem>
              )}
            </>
          )}

          <Pagination
            currentPage={page}
            onPageChange={() => {}}
            totalPages={9}
          />

        </Container>
      </DefaultLayout>
    </>
  );
};

export default Market;
