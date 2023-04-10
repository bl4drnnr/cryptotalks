import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cryptocurrency } from '@models/cryptocurrency.model';
import { UpdateRatesWebjob } from '@webjobs/update-rates.webjob';
import { MarketStats } from '@models/market-stats.model';
import { InformationLog, LogSchema } from '@mongo-schemas/log.schema';
import { MongooseModule } from '@nestjs/mongoose';

const providers = [UpdateRatesWebjob];

@Module({
  providers,
  imports: [
    SequelizeModule.forFeature([Cryptocurrency, MarketStats]),
    MongooseModule.forFeature([
      { name: InformationLog.name, schema: LogSchema }
    ])
  ]
})
export class WebjobsModule {}
