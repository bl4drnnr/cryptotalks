import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { HttpService } from '@shared/http.service';
import { ApiConfigService } from '@shared/config.service';
import { Cryptocurrency } from '@models/cryptocurrency.model';
import { InjectModel } from '@nestjs/sequelize';
import { MarketStats } from '@models/market-stats.model';
import { InjectModel as InjectModelMongo } from '@nestjs/mongoose';
import { InformationLog } from '@mongo-schemas/log.schema';
import { Model } from 'mongoose';

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
    @InjectModel(Cryptocurrency)
    private readonly cryptoRepository: typeof Cryptocurrency,
    @InjectModel(MarketStats)
    private readonly marketStatsRepository: typeof MarketStats,
    @InjectModelMongo(InformationLog.name)
    private readonly logger: Model<InformationLog>,
    private readonly httpService: HttpService,
    private readonly configService: ApiConfigService
  ) {}

  @Cron('0 0 * * * *')
  async handleCron() {
    try {
      const cryptocurrencies: ICoinsResponse =
        await this.httpService.sendRequest({
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
        });

      if (cryptocurrencies.status === 'success') {
        const coinsList = cryptocurrencies.data.coins;
        const marketStats = cryptocurrencies.data.stats;

        const filteredCoins = coinsList.map((o) => {
          return {
            ...o,
            volume24h: o['24hVolume']
          };
        });

        await this.cryptoRepository.bulkCreate(filteredCoins, {
          updateOnDuplicate: ['uuid']
        });
        await this.marketStatsRepository.create({ ...marketStats });

        const coinToCheckId = await this.cryptoRepository.findOne();

        if (!coinToCheckId.symbolId) {
          const coinGeckoIds: Array<{
            id: string;
            symbol: string;
            name: string;
          }> = await this.httpService.sendRequest({
            endpoint: 'coins/list',
            url: this.configService.coinGeckoUrl
          });

          const allAvailableCrypto = await this.cryptoRepository.findAll();

          const cryptoToUpdate = [];

          allAvailableCrypto.forEach((crypto) => {
            coinGeckoIds.forEach((geckoCrypto) => {
              if (crypto.symbol.toLowerCase() === geckoCrypto.symbol) {
                cryptoToUpdate.push({
                  uuid: crypto.uuid,
                  symbolId: geckoCrypto.id
                });
              }
            });
          });

          await Promise.all(
            cryptoToUpdate.map(async (record) => {
              await this.cryptoRepository.update(
                { symbolId: record.symbolId },
                { where: { uuid: record.uuid } }
              );
            })
          );
        }

        const log = new this.logger({
          message:
            'Rates of cryptocurrencies and market stats have been successfully updated.',
          event: 'CRYPTO',
          status: 'SUCCESS',
          timestamp: new Date()
        });
        await log.save();
      } else {
        const log = new this.logger({
          message: `Something is about the status: ${cryptocurrencies.status}`,
          event: 'CRYPTO',
          status: 'ERROR',
          timestamp: new Date()
        });
        await log.save();
      }
    } catch (error: any) {
      const log = new this.logger({
        message: `Error while updating coins webjob: ${error.toString()}`,
        event: 'CRYPTO',
        status: 'ERROR',
        timestamp: new Date()
      });
      await log.save();
    }
  }
}
