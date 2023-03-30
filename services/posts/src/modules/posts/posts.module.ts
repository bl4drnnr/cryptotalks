import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from '@models/post.model';
import { InformationLog, LogSchema } from '@mongo-schemas/log.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    SequelizeModule.forFeature([Post]),
    MongooseModule.forFeature([
      { name: InformationLog.name, schema: LogSchema }
    ])
  ],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
