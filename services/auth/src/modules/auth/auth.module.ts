import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Session } from '@models/session.model';

@Module({
  providers: [AuthService],
  exports: [AuthService],
  controllers: [AuthController],
  imports: [SequelizeModule.forFeature([Session])]
})
export class AuthModule {}
