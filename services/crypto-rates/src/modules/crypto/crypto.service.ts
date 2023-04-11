import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FavoriteCoins } from '@models/favorites-coins.model';
import { Cryptocurrency } from '@models/cryptocurrency.model';
import { SignUpEventDto } from '@event-dto/sign-up.event.dto';
import { Sequelize } from 'sequelize-typescript';
import { AddCryptoToFavoriteEventDto } from '@event-dto/add-crypto-to-favorite.event.dto';
import { RemoveCryptoToFavoriteEventDto } from '@event-dto/remove-crypto-from-favorite.event.dto';
import { HttpService } from '@shared/http.service';
import { ApiConfigService } from '@shared/config.service';
import { UpdateCoinEventDto } from '@event-dto/update-coin.event.dto';

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
    )
  }
}
