import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from '@models/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfirmationHash } from '@models/confirmation-hash.model';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, ConfirmationHash]),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'crypto',
            brokers: ['kafka:9092']
          },
          consumer: {
            groupId: 'auth-consumer'
          }
        }
      }
    ])
  ]
})
export class UsersModule {}
