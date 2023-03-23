import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiConfigService } from '@shared/config.service';
import { IAccessToken } from '@interfaces/access-token.interface';
import { IRefreshToken } from '@interfaces/refresh-token.interface';
import * as uuid from 'uuid';
import * as jwt from 'jsonwebtoken';
import { ITokenPayload } from '@interfaces/token-payload.interface';
import {
  CorruptedTokenException,
  ExpiredTokenException,
  InvalidTokenException,
  SessionHasExpiredException
} from './exceptions/auth-exceptions.export';
import { Session } from '@models/session.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ApiConfigService,
    @InjectModel(Session) private readonly sessionRepository: typeof Session
  ) {}

  private generateAccessToken(accessTokenPayload: IAccessToken) {
    const payload = {
      userId: accessTokenPayload.userId,
      email: accessTokenPayload.email,
      type: 'access'
    };
    const options = {
      expiresIn: this.configService.jwtAuthConfig.accessExpiresIn,
      secret: this.configService.jwtAuthConfig.secret
    };

    return this.jwtService.sign(payload, options);
  }

  private generateRefreshToken() {
    const id = uuid.v4();
    const payload = { id, type: 'refresh' };
    const options = {
      expiresIn: this.configService.jwtAuthConfig.refreshExpiresIn,
      secret: this.configService.jwtAuthConfig.secret
    };

    return { id, token: this.jwtService.sign(payload, options) };
  }

  private async updateRefreshToken(refreshTokenPayload: IRefreshToken) {
    const currentSession = await this.sessionRepository.findOne({
      where: { userId: refreshTokenPayload.userId }
    });
    if (currentSession) {
      await this.sessionRepository.destroy({
        where: { id: currentSession.id }
      });
    }
    return this.sessionRepository.create({
      ...refreshTokenPayload
    });
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
    return this.sessionRepository.findOne({
      where: { tokenId }
    });
  }

  async updateTokens(accessTokenPayload: IAccessToken) {
    const accessToken = this.generateAccessToken(accessTokenPayload);
    const refreshToken = this.generateRefreshToken();

    await this.updateRefreshToken({
      userId: accessTokenPayload.userId,
      tokenId: refreshToken.id
    });

    return { _at: accessToken, _rt: refreshToken.token };
  }

  async refreshToken(tokenRefresh: string) {
    // if (!tokenRefresh) throw new CorruptedTokenException();
    //
    // const payload: ITokenPayload = this.verifyToken(tokenRefresh);
    //
    // const token = await this.getTokenById(payload.id);

    // const user = await this.prisma.users.findFirst({
    //   where: { id: token.userId }
    // });

    // const { _at, _rt } = await this.updateTokens({
    //   userId: user.id,
    //   email: user.email
    // });
    //
    // const userData = await this.userService.getUser({
    //   userId: user.id
    // });
    //
    // return { _at, _rt, userData };
  }

  async deleteRefreshToken(userId: string) {
    return await this.sessionRepository.destroy({ where: { userId } });
  }
}
