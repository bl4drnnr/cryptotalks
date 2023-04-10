import { Module } from '@nestjs/common';
import { UpdateRatesWebjob } from '@webjobs/update-rates.webjob';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cryptocurrency } from '@models/cryptocurrency.model';

const providers = [UpdateRatesWebjob];

@Module({
  providers,
  imports: [SequelizeModule.forFeature([Cryptocurrency])]
})
export class WebjobsModule {}
