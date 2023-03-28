import { Module } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { CryptoController } from './crypto.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {FavoriteCoins} from "@models/favorites-coins.model";
import {Cryptocurrency} from "@models/cryptocurrency.model";

@Module({
  providers: [CryptoService],
  controllers: [CryptoController],
  imports: [
    SequelizeModule.forFeature([FavoriteCoins, Cryptocurrency])
  ]
})
export class CryptoModule {}
