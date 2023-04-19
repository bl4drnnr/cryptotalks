import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cryptocurrency } from '@models/cryptocurrency.model';
import { ClientKafka } from '@nestjs/microservices';
import { FavoriteCoins } from '@models/favorites-coins.model';
import { ResponseDto } from '@dto/response.dto';
import {
  AddCryptoToFavoriteEvent,
  AddCryptoToFavoriteEventDto
} from '@events/add-crypto-to-favorite.event';
import { RemoveCryptoToFavoriteEvent } from '@events/remove-crypto-from-favorite.event';
import sequelize, { Op } from 'sequelize';
import { NoCryptoException } from '@exceptions/no-crypto.exception';
import { UpdateCoinEvent } from '@events/update-coin.event';
import { MarketStats } from '@models/market-stats.model';

@Injectable()
export class CryptoService implements OnModuleInit {
  constructor(
    @InjectModel(Cryptocurrency)
    private readonly cryptoRepository: typeof Cryptocurrency,
    @InjectModel(FavoriteCoins)
    private readonly favoriteCoinsRepo: typeof FavoriteCoins,
    @InjectModel(MarketStats)
    private readonly marketStatsRepository: typeof MarketStats,
    @Inject('CRYPTO_SERVICE') private readonly cryptoClient: ClientKafka
  ) {}

  async listCryptos({
    page,
    pageSize,
    order,
    orderBy,
    searchQuery
  }: {
    page: number;
    pageSize: number;
    order: string;
    orderBy: string;
    searchQuery?: string;
  }) {
    const offset = page * pageSize;
    const limit = pageSize;
    const where = {};
    const attributes = [
      'id',
      'uuid',
      'symbol',
      'name',
      'iconUrl',
      'volume24h',
      'marketCap',
      'price',
      'btcPrice',
      'change',
      'coinrankingUrl',
      'sparkline',
      'rank',
      'tier'
    ];

    if (searchQuery) {
      where[Op.or] = [
        {
          name: {
            [Op.iLike]: `%${searchQuery}%`
          }
        },
        {
          symbol: {
            [Op.iLike]: `%${searchQuery}%`
          }
        }
      ];
    }

    if (orderBy === 'likes') {
      const mostPopularCoins = {};

      const usersFavoriteCoins = await this.favoriteCoinsRepo.findAll();

      usersFavoriteCoins.forEach((favoriteCoinRecord) => {
        favoriteCoinRecord.favoriteCoins.forEach((favoriteCoin) => {
          if (!mostPopularCoins[favoriteCoin])
            mostPopularCoins[favoriteCoin] = 1;
          else mostPopularCoins[favoriteCoin] += 1;
        });
      });

      const filteredMostPopularCoins = Object.entries(mostPopularCoins)
        .sort((a, b) => Number(b[1]) - Number(a[1]))
        .slice(0, pageSize)
        .map((pair) => pair[0]);

      return await this.cryptoRepository.findAndCountAll({
        where: {
          id: {
            [Op.in]: filteredMostPopularCoins
          }
        },
        attributes
      });
    }

    return await this.cryptoRepository.findAndCountAll({
      where: { ...where },
      order: [[orderBy, order]],
      limit,
      offset,
      attributes
    });
  }

  async getCryptoById({ uuid }: { uuid: string }) {
    const foundCrypto = await this.cryptoRepository.findOne({
      where: { uuid }
    });
    if (!foundCrypto) throw new NoCryptoException();

    if (!foundCrypto.description) {
      const updatedCoin = await this.cryptoClient
        .send('update_coin', new UpdateCoinEvent({ coinId: foundCrypto.uuid }))
        .toPromise();
      return updatedCoin[1][0];
    }

    return foundCrypto;
  }

  async getMarketStats() {
    const marketStats = await this.marketStatsRepository.findAll({
      attributes: [
        'total',
        [sequelize.literal('total_coins'), 'totalCoins'],
        [sequelize.literal('total_markets'), 'totalMarkets'],
        [sequelize.literal('total_exchanges'), 'totalExchanges'],
        [sequelize.literal('total_market_cap'), 'totalMarketCap'],
        [sequelize.literal('total_daily_volume'), 'total24hVolume']
      ]
    });
    return marketStats[0];
  }

  async addCryptoToFavorites(payload: AddCryptoToFavoriteEventDto) {
    const favoriteCrypto = await this.cryptoRepository.findByPk(
      payload.cryptoId
    );
    if (!favoriteCrypto) throw new NoCryptoException();

    this.cryptoClient.emit(
      'add_crypto_to_favorite',
      new AddCryptoToFavoriteEvent({ ...payload })
    );
    return new ResponseDto();
  }

  async removeCryptoFromFavorites(payload: AddCryptoToFavoriteEventDto) {
    const favoriteCrypto = await this.cryptoRepository.findByPk(
      payload.cryptoId
    );
    if (!favoriteCrypto) throw new NoCryptoException();

    this.cryptoClient.emit(
      'remove_crypto_from_favorite',
      new RemoveCryptoToFavoriteEvent({ ...payload })
    );
    return new ResponseDto();
  }

  onModuleInit(): any {
    this.cryptoClient.subscribeToResponseOf('update_coin');
  }
}
