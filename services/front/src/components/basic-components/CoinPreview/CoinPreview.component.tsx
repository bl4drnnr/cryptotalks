import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';
import { Line, LineChart, YAxis } from 'recharts';

import { CoinPreviewProps } from '@components/CoinPreview/CoinPreview.interface';
import {
  PopularCryptoContainer,
  PopularCryptoItem,
  PopularCryptoParagraph,
  PopularCryptoWrapper
} from '@styles/CoinPreview.style';

const CoinPreview = ({
  uuid,
  iconUrl,
  name,
  symbol,
  price,
  change,
  sparkline,
  width,
  height
}: CoinPreviewProps) => {
  const router = useRouter();

  const handleRedirect = async (path: string) => {
    return await router.push(path);
  };

  return (
    <PopularCryptoItem
      onClick={() => handleRedirect(`market/${uuid}`)}
    >
      <Image src={iconUrl} alt={name} width={72} height={72} />

      <PopularCryptoWrapper>
        <PopularCryptoContainer>
          <PopularCryptoParagraph>{symbol}</PopularCryptoParagraph>
          <PopularCryptoParagraph className={'small'}>
            {name}
          </PopularCryptoParagraph>
        </PopularCryptoContainer>
      </PopularCryptoWrapper>

      <PopularCryptoWrapper className={'small-text'}>
        <PopularCryptoContainer>
          <PopularCryptoParagraph>
            Price: {parseFloat(price).toFixed(2)} $
          </PopularCryptoParagraph>
          <PopularCryptoParagraph className={'small'}>
            Cng: {change} %
          </PopularCryptoParagraph>
        </PopularCryptoContainer>
      </PopularCryptoWrapper>

      <LineChart
        width={width}
        height={height}
        data={sparkline}
      >
        <YAxis
          hide={true}
          type={'number'}
          domain={[
            Math.min(...sparkline.map((o: any) => o.value)),
            Math.max(...sparkline.map((o: any) => o.value))
          ]} />
        <Line
          dataKey="price"
          stroke={change > 0 ? 'rgb(59, 232, 59)': 'rgb(255, 51, 51)'}
        />
      </LineChart>
    </PopularCryptoItem>
  );
};

export default CoinPreview;
