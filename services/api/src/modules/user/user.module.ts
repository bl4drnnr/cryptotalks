import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { ApiConfigService } from '@shared/config.service';
import { User } from '@models/user.model';
import { ConfirmationHash } from '@models/confirmation-hash.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forFeature([User, ConfirmationHash]),
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
      }
    ]),
    JwtModule.registerAsync({
      useFactory: async (configService: ApiConfigService) => ({
        secret: configService.jwtSecret.secret
      }),
      inject: [ApiConfigService]
    })
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
