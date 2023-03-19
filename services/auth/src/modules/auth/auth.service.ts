import { forwardRef, Inject, Injectable } from '@nestjs/common';
// import { PrismaService } from '@shared/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ApiConfigService } from '@shared/config.service';
import { IAccessToken } from '@interfaces/access-token.interface';
import { IRefreshToken } from '@interfaces/refresh-token.interface';
// import * as uuid from 'uuid';
import * as jwt from 'jsonwebtoken';
import { ITokenPayload } from '@interfaces/token-payload.interface';
import {
  CorruptedTokenException,
  ExpiredTokenException,
  InvalidTokenException,
  SessionHasExpiredException
} from './exceptions/auth-exceptions.export';
// import { UserService } from '@user/user.service';

@Injectable()
export class AuthService {
  constructor(
    // private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ApiConfigService // @Inject(forwardRef(() => UserService)) // private readonly userService: UserService
  ) {}

  private generateAccessToken(IAccessToken: IAccessToken) {
    //   const payload = {
    //     userId: IAccessToken.userId,
    //     email: IAccessToken.email,
    //     type: 'access'
    //   };
    //   const options = {
    //     expiresIn: this.configService.jwtAuthConfig.accessExpiresIn,
    //     secret: this.configService.jwtAuthConfig.secret
    //   };
    //
    //   return this.jwtService.sign(payload, options);
  }

  private generateRefreshToken() {
    //   const id = uuid.v4();
    //   const payload = { id, type: 'refresh' };
    //   const options = {
    //     expiresIn: this.configService.jwtAuthConfig.refreshExpiresIn,
    //     secret: this.configService.jwtAuthConfig.secret
    //   };
    //
    //   return { id, token: this.jwtService.sign(payload, options) };
    // }
    //
    // private async updateRefreshToken(IRefreshToken: IRefreshToken) {
    //   const currentSession = await this.prisma.sessions.findFirst({
    //     where: { userId: IRefreshToken.userId }
    //   });
    //   if (currentSession) {
    //     await this.prisma.sessions.delete({
    //       where: { id: currentSession.id }
    //     });
    //   }
    //
    //   return await this.prisma.sessions.create({
    //     data: IRefreshToken
    //   });
  }

  verifyToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: this.configService.jwtAuthConfig.secret
      });
    } catch (error: any) {
      if (error instanceof jwt.TokenExpiredError)
        throw new ExpiredTokenException();
      else if (error instanceof jwt.JsonWebTokenError)
        throw new InvalidTokenException();
      else throw new SessionHasExpiredException();
    }
  }

  async getTokenById(tokenId: string) {
    //   return this.prisma.sessions.findFirst({
    //     where: { tokenId }
    //   });
  }

  async updateTokens(IAccessToken: IAccessToken) {
    //   const accessToken = this.generateAccessToken(IAccessToken);
    //   const refreshToken = this.generateRefreshToken();
    //
    //   await this.updateRefreshToken({
    //     userId: IAccessToken.userId,
    //     tokenId: refreshToken.id
    //   });
    //
    //   return { _at: accessToken, _rt: refreshToken.token };
  }

  async refreshToken(tokenRefresh: string) {
    //   if (!tokenRefresh) throw new CorruptedTokenException();
    //
    //   const payload: ITokenPayload = this.verifyToken(tokenRefresh);
    //
    //   const token = await this.getTokenById(payload.id);
    //
    //   const user = await this.prisma.users.findFirst({
    //     where: { id: token.userId }
    //   });
    //
    //   const { _at, _rt } = await this.updateTokens({
    //     userId: user.id,
    //     email: user.email
    //   });
    //
    //   const userData = await this.userService.getUser({
    //     userId: user.id
    //   });
    //
    //   return { _at, _rt, userData };
  }

  async deleteRefreshToken(userId: string) {
    //   return await this.prisma.sessions.delete({ where: { userId } });
  }
}
