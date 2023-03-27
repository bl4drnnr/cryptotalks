import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from '@models/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfirmationHash } from '@models/confirmation-hash.model';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GrpcServerExceptionFilter } from "nestjs-grpc-exceptions";
import {APP_FILTER} from "@nestjs/core";

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: APP_FILTER,
      useClass: GrpcServerExceptionFilter,
    }
  ],
  imports: [
    SequelizeModule.forFeature([User, ConfirmationHash]),
    ClientsModule.register([
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
    ])
  ]
})
export class UsersModule {}
