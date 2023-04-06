import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfirmationHash } from '@models/confirmation-hash.model';
import { UserSettings } from '@models/user-settings.model';
import { User } from '@models/user.model';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Post } from '@models/post.model';
import { MongooseModule } from '@nestjs/mongoose';
import { InformationLog, LogSchema } from '@mongo-schemas/log.schema';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, UserSettings, ConfirmationHash, Post]),
    MongooseModule.forFeature([
      { name: InformationLog.name, schema: LogSchema }
    ]),
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
