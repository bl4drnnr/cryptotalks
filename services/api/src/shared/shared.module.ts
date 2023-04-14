import { Global, Module } from '@nestjs/common';
import { ApiConfigService } from '@shared/config.service';
import { ValidatorService } from '@shared/validator.service';
import { LoggerService } from '@shared/logger.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

const providers = [ApiConfigService, ValidatorService, LoggerService];

@Global()
@Module({
  providers,
  exports: [...providers],
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'users',
            brokers: ['kafka:9092']
          },
          consumer: {
            groupId: 'users-consumer'
          }
        }
      },
      {
        name: 'AUTH_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'auth',
            brokers: ['kafka:9092']
          },
          consumer: {
            groupId: 'auth-consumer'
          }
        }
      },
      {
        name: 'CRYPTO_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'auth',
            brokers: ['kafka:9092']
          },
          consumer: {
            groupId: 'crypto-consumer'
          }
        }
      },
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
    ])
  ]
})
export class SharedModule {}
