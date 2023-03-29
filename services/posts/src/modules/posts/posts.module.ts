import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { User } from '@models/user.model';
import { UserSettings } from '@models/user-settings.model';
import { ConfirmationHash } from '@models/confirmation-hash.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([User, UserSettings, ConfirmationHash])],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
