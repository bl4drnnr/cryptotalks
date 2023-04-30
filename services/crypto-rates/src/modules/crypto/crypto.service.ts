import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FavoriteCoins } from '@models/favorites-coins.model';
import { Cryptocurrency } from '@models/cryptocurrency.model';
import { Sequelize } from 'sequelize-typescript';
import { HttpService } from '@shared/http.service';
import { ApiConfigService } from '@shared/config.service';
import { AddCryptoToFavoriteEventDto } from '@events/add-crypto-to-favorite.event';
import { RemoveCryptoToFavoriteEventDto } from '@events/remove-crypto-from-favorite.event';
import { UpdateCoinEventDto } from '@events/update-coin.event';
import { SignUpEventDto } from '@events/user-sign-up.event';
import { CloseAccEventDto } from '@events/close-acc.event';

@Injectable()
export class CryptoService {
  constructor(
    @InjectModel(FavoriteCoins)
    private readonly favoriteCoinsRepository: typeof FavoriteCoins,
    @InjectModel(Cryptocurrency)
    private readonly cryptocurrencyRepository: typeof Cryptocurrency,
    private readonly httpService: HttpService,
    private readonly configService: ApiConfigService
  ) {}

  async handleCryptoForUserCreated(payload: SignUpEventDto) {
    await this.favoriteCoinsRepository.create({
      userId: payload.userId,
      favoriteCoins: []
    });
  }

  async handleAddCryptoToFavorite(payload: AddCryptoToFavoriteEventDto) {
    await this.favoriteCoinsRepository.update(
      {
        favoriteCoins: Sequelize.literal(
          `array_append(favorite_coins, '${payload.cryptoId}')`
        )
      },
      {
        where: {
          userId: payload.userId
        }
      }
    );
  }

  async handleRemoveCryptoFromFavorite(
    payload: RemoveCryptoToFavoriteEventDto
  ) {
    await this.favoriteCoinsRepository.update(
      {
        favoriteCoins: Sequelize.literal(
          `array_remove(favorite_coins, '${payload.cryptoId}')`
        )
      },
      {
        where: {
          userId: payload.userId
        }
      }
    );
  }

  async handleUpdateCoin(payload: UpdateCoinEventDto) {
    const coin = await this.cryptocurrencyRepository.findOne({
      where: { uuid: payload.coinId }
    });

    const coinInformation = await this.httpService.sendRequest({
      endpoint: `coins/${coin.symbolId}`,
      url: this.configService.coinGeckoUrl
    });

    return await this.cryptocurrencyRepository.update(
      { description: coinInformation.description.en },
      { where: { id: coin.id }, returning: true }
    );
  }

  async closeAccount({ userId }: CloseAccEventDto) {
    return await this.favoriteCoinsRepository.destroy({
      where: { userId }
    });
  }
}
