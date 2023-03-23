import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from '@models/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfirmationHash } from '@models/confirmation-hash.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [SequelizeModule.forFeature([User, ConfirmationHash])]
})
export class UsersModule {}
