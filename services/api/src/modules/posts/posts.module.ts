import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { ApiConfigService } from '@shared/config.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'POSTS_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'posts',
            brokers: ['kafka:9092']
          },
          consumer: {
            groupId: 'posts-consumer'
          }
        }
      }
    ]),
    JwtModule.registerAsync({
      useFactory: async (configService: ApiConfigService) => ({
        secret: configService.jwtAuthConfig.secret
      }),
      inject: [ApiConfigService]
    })
  ],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
