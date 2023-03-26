import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiConfigService } from '@shared/config.service';
import * as uuid from 'uuid';
import * as jwt from 'jsonwebtoken';
import { Session } from '@models/session.model';
import { InjectModel } from '@nestjs/sequelize';
import { ClientKafka } from '@nestjs/microservices';
import { ExpiredTokenException } from '@exceptions/expired-token.exception';
import { InvalidTokenException } from '@exceptions/invalid-token.exception';
import { SessionHasExpiredException } from '@exceptions/session-expired.exception';
import { CorruptedTokenException } from '@exceptions/corrupted-token.exception';
import { AccessTokenDto } from '@dto/access-token.dto';
import { RefreshTokenDto } from '@dto/refresh-token.dto';
import { TokenPayloadDto } from '@dto/token-payload.dto';
import { GetUserByIdEvent } from '@events/get-user-by-id.event';
import { ResponseDto } from '@dto/response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ApiConfigService,
    @InjectModel(Session) private readonly sessionRepository: typeof Session,
    @Inject('USERS_SERVICE') private readonly userClient: ClientKafka
  ) {}

  private generateAccessToken(accessTokenPayload: AccessTokenDto) {
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

  private async updateRefreshToken(refreshTokenPayload: RefreshTokenDto) {
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

  private verifyToken({ token }: { token: string }) {
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

  async updateTokens(accessTokenPayload: AccessTokenDto) {
    const accessToken = this.generateAccessToken(accessTokenPayload);
    const refreshToken = this.generateRefreshToken();

    await this.updateRefreshToken({
      userId: accessTokenPayload.userId,
      tokenId: refreshToken.id
    });

    return { _at: accessToken, _rt: refreshToken.token };
  }

  async refreshToken(tokenRefresh: string) {
    if (!tokenRefresh) throw new CorruptedTokenException();

    const payload: TokenPayloadDto = this.verifyToken({ token: tokenRefresh });

    const token = await this.getTokenById(payload.id);

    this.userClient
      .send('get_user_by_id', new GetUserByIdEvent({ id: token.userId }))
      .subscribe(async (user) => {
        const { _at, _rt } = await this.updateTokens({
          userId: user.id,
          email: user.email
        });

        return { _at, _rt };
      });
  }

  deleteRefreshToken({ userId }: { userId: string }) {
    return this.sessionRepository.destroy({ where: { userId } });
  }
}
