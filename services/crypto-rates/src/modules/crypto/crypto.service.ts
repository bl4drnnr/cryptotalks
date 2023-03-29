import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FavoriteCoins } from '@models/favorites-coins.model';
import { Cryptocurrency } from '@models/cryptocurrency.model';
import { SignUpEventDto } from '@event-dto/sign-up-event.dto';

@Injectable()
export class CryptoService {
  constructor(
    @InjectModel(FavoriteCoins)
    private readonly favoriteCoinsRepository: typeof FavoriteCoins,

    @InjectModel(Cryptocurrency)
    private readonly cryptocurrencyRepository: typeof Cryptocurrency
  ) {}

  async signUp(payload: SignUpEventDto) {
    await this.favoriteCoinsRepository.create({
      userId: payload.userId,
      favoriteCoins: []
    });
  }
}
