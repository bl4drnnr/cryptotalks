import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'POSTS_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'posts',
            brokers: ['localhost:9092']
          },
          consumer: {
            groupId: 'posts-consumer'
          }
        }
      }
    ])
  ],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
