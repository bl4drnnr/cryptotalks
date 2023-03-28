import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CryptoModule } from './modules/crypto/crypto.module';
import { FavoriteCoins } from '@models/favorites-coins.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cryptocurrency } from '@models/cryptocurrency.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `../../.env.${process.env.NODE_ENV}`
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadModels: true
    }),
    CryptoModule
  ]
})
export class AppModule {}
