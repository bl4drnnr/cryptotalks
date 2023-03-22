import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'users',
            brokers: ['localhost:9092']
          },
          consumer: {
            groupId: 'users-consumer'
          }
        }
      },
    ])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
