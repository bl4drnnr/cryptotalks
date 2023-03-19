import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BasicAuthMiddleware } from '@middlewares/basic-auth.middleware';
import { SharedModule } from '@shared/shared.module';
import { AuthModule } from '@auth/auth.module';
import { UserModule } from '@user/user.module';

@Module({
  imports: [
    SharedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `../../.env.${process.env.NODE_ENV}`
    }),
    AuthModule,
    UserModule
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BasicAuthMiddleware).forRoutes({
      path: '/api/*',
      method: RequestMethod.ALL
    });
  }
}
