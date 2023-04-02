import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FavoriteCoins } from '@models/favorites-coins.model';
import { Cryptocurrency } from '@models/cryptocurrency.model';
import { SignUpEventDto } from '@event-dto/sign-up.event.dto';
import { Sequelize } from 'sequelize-typescript';
import { AddCryptoToFavoriteEventDto } from '@event-dto/add-crypto-to-favorite.event.dto';
import { RemoveCryptoToFavoriteEventDto } from '@event-dto/remove-crypto-from-favorite.event.dto';

@Injectable()
export class CryptoService {
  constructor(
    @InjectModel(FavoriteCoins)
    private readonly favoriteCoinsRepository: typeof FavoriteCoins,

    @InjectModel(Cryptocurrency)
    private readonly cryptocurrencyRepository: typeof Cryptocurrency
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
}
