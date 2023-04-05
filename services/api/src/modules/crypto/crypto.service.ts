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

@Injectable()
export class CryptoService {
  constructor(
    @InjectModel(Cryptocurrency)
    private readonly cryptoRepository: typeof Cryptocurrency,
    @InjectModel(FavoriteCoins)
    private readonly favoriteCoinsRepo: typeof FavoriteCoins,
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

  getCryptoById({ id }: { id: string }) {
    return this.cryptoRepository.findByPk(id);
  }

  addCryptoToFavorites(payload: AddCryptoToFavoriteEventDto) {
    // TODO Check for errors
    this.cryptoClient.emit(
      'add_crypto_to_favorite',
      new AddCryptoToFavoriteEvent({ ...payload })
    );
    return new ResponseDto();
  }

  removeCryptoFromFavorites(payload: AddCryptoToFavoriteEventDto) {
    this.cryptoClient.emit(
      'remove_crypto_from_favorite',
      new RemoveCryptoToFavoriteEvent({ ...payload })
    );
    return new ResponseDto();
  }
}
