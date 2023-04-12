import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from '@models/post.model';
import { InformationLog, LogSchema } from '@mongo-schemas/log.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PostInfo } from '@models/post-info.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Post, PostInfo]),
    MongooseModule.forFeature([
      { name: InformationLog.name, schema: LogSchema }
    ])
  ],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
