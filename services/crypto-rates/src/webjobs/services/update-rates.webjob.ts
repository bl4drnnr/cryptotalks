import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { HttpService } from '@shared/http.service';
import { ApiConfigService } from '@shared/config.service';
import { Cryptocurrency } from '@models/cryptocurrency.model';
import { InjectModel } from '@nestjs/sequelize';

interface ICoinsDataStats {
  total: number;
  totalCoins: number;
  totalMarkets: number;
  totalExchanges: number;
  totalMarketCap: string;
  total24hVolume: string;
}

interface ICoinsData {
  stats: ICoinsDataStats;
  coins: Cryptocurrency[];
}

interface ICoinsResponse {
  status: string;
  data: ICoinsData;
}

@Injectable()
export class UpdateRatesWebjob {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ApiConfigService,
    @InjectModel(Cryptocurrency)
    private readonly cryptoRepository: typeof Cryptocurrency
  ) {}

  @Cron('0 * * * *')
  async handleCron() {
    const cryptocurrencies: ICoinsResponse = await this.httpService.sendRequest(
      {
        endpoint: 'coins',
        url: this.configService.coinrankingCredentials.url,
        headers: {
          'X-RapidAPI-Key': this.configService.coinrankingCredentials.key,
          'X-RapidAPI-Host': this.configService.coinrankingCredentials.host
        },
        params: {
          referenceCurrencyUuid:
            this.configService.coinrankingCredentials.reference_currency_uuid,
          timePeriod: this.configService.coinrankingCredentials.time_period,
          limit: this.configService.coinrankingCredentials.limit,
          'tiers[0]': '1'
        }
      }
    );
    const coinsList = cryptocurrencies.data.coins;

    const filteredCoins = coinsList.map((o) => {
      return {
        ...o,
        Volume24h: o['24hVolume'],
        sparkline: o['sparkline']
      };
    });

    filteredCoins.forEach((item) => {
      delete item['24hVolume'];
      delete item['lowVolume'];
      delete item['color'];
      delete item['listedAt'];
    });

    filteredCoins.map(async (item) => {
      await this.cryptoRepository.upsert({
        uuid: item.uuid,
        ...item
      });
    });
  }
}
