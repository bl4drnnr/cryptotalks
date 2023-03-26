import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from '@models/post.model';
import { ConfirmationHash } from '@models/confirmation-hash.model';
import { Session } from '@models/session.model';
import { User } from '@models/user.model';
import { PostsModule } from '@modules/posts.module';
import { UserModule } from '@modules/user.module';
import { CryptoModule } from '@modules/crypto.module';
import { AuthModule } from '@modules/auth.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `../../.env.${process.env.NODE_ENV}`
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      models: [Post, User, Session, ConfirmationHash],
      autoLoadModels: true
    }),
    PostsModule,
    UserModule,
    CryptoModule,
    AuthModule,
    SharedModule
  ]
})
export class AppModule {}
