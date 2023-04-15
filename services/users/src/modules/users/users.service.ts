import { Inject, Injectable } from '@nestjs/common';
import { SignUpEventDto } from '@event-dto/sign-up.event.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ClientKafka } from '@nestjs/microservices';
import { ConfirmationHash } from '@models/confirmation-hash.model';
import { UserSettings } from '@models/user-settings.model';
import { EmailService } from '@shared/email.service';
import { User } from '@models/user.model';
import { ConfirmAccountEventDto } from '@event-dto/confirm-account.event.dto';
import { InjectModel as InjectModelMongo } from '@nestjs/mongoose';
import { InformationLog } from '@mongo-schemas/log.schema';
import { Model } from 'mongoose';
import { CloseAccEventDto } from '@event-dto/close-acc.event.dto';
import { UpdateUserEventDto } from '@event-dto/update-user.event.dto';
import { UpdateUserSecurityEventDto } from '@event-dto/update-user-security.event.dto';
import { PhoneService } from '@shared/phone.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    @InjectModel(UserSettings)
    private readonly userSettingsRepository: typeof UserSettings,
    @InjectModel(ConfirmationHash)
    private readonly confirmHashRepository: typeof ConfirmationHash,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
    @InjectModelMongo(InformationLog.name)
    private readonly logger: Model<InformationLog>,
    private readonly emailService: EmailService,
    private readonly phoneService: PhoneService
  ) {}

  async signUp(payload: SignUpEventDto) {
    await this.userSettingsRepository.create({
      userId: payload.userId
    });
    await this.confirmHashRepository.create({
      userId: payload.userId,
      confirmationHash: payload.confirmationHash
    });
    await this.emailService.sendConfirmationEmail({
      target: payload.email,
      confirmationHash: payload.confirmationHash
    });
  }

  async accountConfirmation(payload: ConfirmAccountEventDto) {
    await this.confirmHashRepository.update(
      {
        confirmed: true
      },
      { where: { id: payload.hashId } }
    );

    await this.userRepository.update(
      {
        accountConfirm: true
      },
      { where: { id: payload.userId } }
    );
  }

  async updateUserAccount(payload: UpdateUserEventDto) {
    const userId = payload.userId;
    delete payload.userId;

    await this.userRepository.update(
      { ...payload },
      {
        where: { id: userId }
      }
    );
  }

  async updateUserSecuritySettings(payload: UpdateUserSecurityEventDto) {
    const userId = payload.userId;
    delete payload.userId;

    await this.userSettingsRepository.update(
      { ...payload },
      { where: { userId } }
    );
  }

  async closeUserAccount({ userId }: CloseAccEventDto) {
    await this.userRepository.destroy({
      where: { id: userId }
    });
  }

  async sendVerificationMobileCode({
    phone,
    userId
  }: UpdateUserSecurityEventDto) {
    const verificationCode = await this.phoneService.sendSmsCode({
      targetPhoneNumber: phone
    });

    return this.userSettingsRepository.update(
      {
        phoneVerificationCode: verificationCode.toString(),
        verificationCodeCreatedAt: new Date()
      },
      { where: { userId } }
    );
  }

  async logUserAction(payload: any) {
    const log = new this.logger(payload);
    await log.save();
  }
}
