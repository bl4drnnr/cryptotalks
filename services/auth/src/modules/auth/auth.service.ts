import { Injectable } from '@nestjs/common';
import { Session } from '@models/session.model';
import { InjectModel } from '@nestjs/sequelize';
import { RefreshTokenEventDto } from '@event-dto/refresh-token-event.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Session) private readonly sessionRepository: typeof Session
  ) {}

  async updateTokens(payload: RefreshTokenEventDto) {
    const currentSession = await this.sessionRepository.findOne({
      where: { userId: payload.userId }
    });
    if (currentSession) {
      await this.sessionRepository.destroy({
        where: { id: currentSession.id }
      });
    }
    await this.sessionRepository.create({
      ...payload
    });
  }

  deleteRefreshToken({ userId }: { userId: string }) {
    return this.sessionRepository.destroy({ where: { userId } });
  }
}
