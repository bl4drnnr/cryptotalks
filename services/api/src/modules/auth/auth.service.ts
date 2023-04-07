import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import * as uuid from 'uuid';
import * as jwt from 'jsonwebtoken';
import { AccessTokenDto } from '@dto/access-token.dto';
import { RefreshTokenDto } from '@dto/refresh-token.dto';
import { ExpiredTokenException } from '@exceptions/expired-token.exception';
import { InvalidTokenException } from '@exceptions/invalid-token.exception';
import { SessionHasExpiredException } from '@exceptions/session-expired.exception';
import { CorruptedTokenException } from '@exceptions/corrupted-token.exception';
import { TokenPayloadDto } from '@dto/token-payload.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { ApiConfigService } from '@shared/config.service';
import { Session } from '@models/session.model';
import { RefreshTokensEvent } from '@events/refresh-tokens.event';
import { UserService } from '@modules/user.service';
import { LogEvent } from '@events/log.event';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ApiConfigService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @InjectModel(Session) private readonly sessionRepository: typeof Session,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka
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

  private updateRefreshToken(refreshTokenPayload: RefreshTokenDto) {
    this.authClient.emit(
      'log_auth_action',
      new LogEvent({
        event: 'SIGN_IN',
        message: `User ${refreshTokenPayload.userId} has successfully logged in.`,
        status: 'SUCCESS',
        timestamp: new Date()
      })
    );
    this.authClient.emit(
      'update_token',
      new RefreshTokensEvent({ ...refreshTokenPayload })
    );
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

    this.updateRefreshToken({
      userId: accessTokenPayload.userId,
      tokenId: refreshToken.id
    });

    return { _at: accessToken, _rt: refreshToken.token };
  }

  async refreshToken({ refreshToken }: { refreshToken: string }) {
    if (!refreshToken) throw new CorruptedTokenException();

    const payload: TokenPayloadDto = this.verifyToken({ token: refreshToken });

    const token = await this.getTokenById(payload.id);

    if (!token) throw new InvalidTokenException();

    const user = await this.userService.getUserPersonalInformation({
      id: token.userId
    });

    const { _at, _rt } = await this.updateTokens({
      userId: user.id,
      email: user.email
    });

    return { _at, _rt, user };
  }
}
