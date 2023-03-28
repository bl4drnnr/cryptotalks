import { Module } from '@nestjs/common';
import { UsersModule } from '@modules/users.module';
import { SharedModule } from '@shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import { User } from '@models/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserSettings } from '@models/user-settings.model';

@Module({
  imports: [
    UsersModule,
    SharedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `../../.env.${process.env.NODE_ENV}`
    }),
    // TODO Try to remove this
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      models: [User, UserSettings],
      autoLoadModels: true
    })
  ]
})
export class AppModule {}
