import dayjs from 'dayjs';

import { GetCryptoByIdResponse } from '@services/get-crypto-by-id/get-crypto-by-id.interface';
import { ICoins } from '@services/list-crypto/list-crypto.interface';

export const parseCoins = (listOfCoins: Array<ICoins> | GetCryptoByIdResponse) => {
  if (Array.isArray(listOfCoins)) {
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
  } else {
    const sparklineLength = listOfCoins.sparkline.length;
    const parsedSparklines = listOfCoins.sparkline.map((item: any, index: number) => ({
      date: dayjs().subtract(sparklineLength - index, 'hours').format('hh'),
      price: parseFloat(item).toFixed(8)
    }));

    return {
      ...listOfCoins,
      sparkline: parsedSparklines,
      price: parseFloat(String(listOfCoins.price)).toFixed(2),
      marketCap: (parseFloat(listOfCoins.marketCap) / 1000000000).toFixed(2),
      volume24h: (parseFloat(listOfCoins.volume24h) / 1000000000).toFixed(2),
      btcPrice: parseFloat(String(listOfCoins.btcPrice)).toFixed(8)
    };
  }
};
