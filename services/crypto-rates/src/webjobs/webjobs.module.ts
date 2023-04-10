import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cryptocurrency } from '@models/cryptocurrency.model';
import { UpdateRatesWebjob } from '@webjobs/update-rates.webjob';

const providers = [UpdateRatesWebjob];

@Module({
  providers,
  imports: [SequelizeModule.forFeature([Cryptocurrency])]
})
export class WebjobsModule {}
