import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Session } from '@models/session.model';
import { MongooseModule } from '@nestjs/mongoose';
import { InformationLog, LogSchema } from '@mongo-schemas/log.schema';

@Module({
  providers: [AuthService],
  exports: [AuthService],
  controllers: [AuthController],
  imports: [
    MongooseModule.forFeature([
      { name: InformationLog.name, schema: LogSchema }
    ]),
    SequelizeModule.forFeature([Session])
  ]
})
export class AuthModule {}
