import { Injectable } from '@nestjs/common';
import { Session } from '@models/session.model';
import { InjectModel } from '@nestjs/sequelize';
import { InformationLog } from '@mongo-schemas/log.schema';
import { Model } from 'mongoose';
import { InjectModel as InjectModelMongo } from '@nestjs/mongoose';
import { UserLogoutEventDto } from '@events/user-logout.event';
import { LogEventDto } from '@events/log.event';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Session) private readonly sessionRepository: typeof Session,
    @InjectModelMongo(InformationLog.name)
    private readonly logger: Model<InformationLog>
  ) {}

  deleteRefreshToken({ userId }: UserLogoutEventDto) {
    return this.sessionRepository.destroy({ where: { userId } });
  }

  async logAuthAction(payload: LogEventDto) {
    const log = new this.logger(payload);
    await log.save();
  }
}
