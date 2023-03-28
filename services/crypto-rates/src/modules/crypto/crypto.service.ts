import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {FavoriteCoins} from "@models/favorites-coins.model";

@Injectable()
export class CryptoService {
  constructor(
    @InjectModel(FavoriteCoins) private readonly favoriteCoinsRepository: typeof FavoriteCoins
  ) {}

  async signUp() {
    //
  }
}
