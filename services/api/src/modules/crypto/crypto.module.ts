import { Module } from '@nestjs/common';
import { CryptoController } from './crypto.controller';
import { CryptoService } from './crypto.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cryptocurrency } from '@models/cryptocurrency.model';
import { FavoriteCoins } from '@models/favorites-coins.model';
import { JwtModule } from '@nestjs/jwt';
import { ApiConfigService } from '@shared/config.service';
import {MarketStats} from "@models/market-stats.model";

@Module({
  imports: [
    SequelizeModule.forFeature([Cryptocurrency, FavoriteCoins, MarketStats]),
    ClientsModule.register([
      {
        name: 'CRYPTO_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'crypto',
            brokers: ['kafka:9092']
          },
          consumer: {
            groupId: 'crypto-consumer'
          }
        }
      }
    ]),
    JwtModule.registerAsync({
      useFactory: async (configService: ApiConfigService) => ({
        secret: configService.jwtAuthConfig.secret
      }),
      inject: [ApiConfigService]
    })
  ],
  controllers: [CryptoController],
  providers: [CryptoService]
})
export class CryptoModule {}
