import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from '@auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '@auth/auth.module';

@Module({
  controllers: [UserController],
  imports: [forwardRef(() => AuthModule), JwtModule],
  providers: [UserService, AuthService],
  exports: [UserService]
})
export class UserModule {}
