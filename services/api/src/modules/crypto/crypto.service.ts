import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cryptocurrency } from '@models/cryptocurrency.model';
import { ClientKafka } from '@nestjs/microservices';
import { FavoriteCoins } from '@models/favorites-coins.model';
import { ResponseDto } from '@dto/response.dto';
import { AddCryptoToFavoriteEventDto } from '@event-dto/add-crypto-to-favorite.event.dto';
import { AddCryptoToFavoriteEvent } from '@events/add-crypto-to-favorite.event';
import { RemoveCryptoToFavoriteEvent } from '@events/remove-crypto-from-favorite.event';
import { Op } from 'sequelize';
import { NoCryptoException } from '@exceptions/no-crypto.exception';
import { UpdateCoinEvent } from '@events/update-coin.event';
import {MarketStats} from "@models/market-stats.model";

@Injectable()
export class CryptoService {
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

    if (searchQuery) {
      where['title'] = {
        [Op.iLike]: `%${searchQuery}%`
      };
    }

    return await this.cryptoRepository.findAndCountAll({
      attributes: [
        'id',
        'uuid',
        'symbol',
        'name',
        'description',
        'iconUrl',
        'sparkline',
        'rank',
        'tier'
      ],
      order: [[order, orderBy]],
      where: { ...where },
      limit,
      offset
    });
  }

  async getCryptoById({ id }: { id: string }) {
    const foundCrypto = await this.cryptoRepository.findByPk(id);
    if (!foundCrypto) throw new NoCryptoException();

    if (!foundCrypto.description) {
      this.cryptoClient.send(
        'update_coin',
        new UpdateCoinEvent({ coinId: foundCrypto.uuid })
      );
      return;
    }

    return foundCrypto;
  }

  async getMarketStats() {
    const marketStats = await this.marketStatsRepository.findAll();
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
}
