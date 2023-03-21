import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
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
  controllers: [GatewayController],
  providers: [GatewayService]
})
export class GatewayModule {}
