import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ClientKafka } from '@nestjs/microservices';
import { ConfirmationHash } from '@models/confirmation-hash.model';
import { UserSettings } from '@models/user-settings.model';
import { EmailService } from '@shared/email.service';
import { User } from '@models/user.model';
import { InjectModel as InjectModelMongo } from '@nestjs/mongoose';
import { InformationLog } from '@mongo-schemas/log.schema';
import { Model } from 'mongoose';
import { PhoneService } from '@shared/phone.service';
import { CloseAccEventDto } from '@events/close-acc.event';
import { ConfirmAccountEventDto } from '@events/confirm-account.event';
import { SignUpEventDto } from '@events/user-sign-up.event';
import { UpdateUserSecurityEventDto } from '@events/update-user-security.event';
import { UpdateUserEventDto } from '@events/update-user.event';
import { ChangeEmailEventDto } from '@events/change-email.event';
import { SendVerificationEmailEventDto } from '@events/send-verification-email.event';

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

  private async sendEmail({
    target,
    confirmationHash,
    confirmationType
  }: {
    target: string;
    confirmationHash: string;
    confirmationType: 'EMAIL_CHANGE' | 'REGISTRATION' | 'FORGOT_PASSWORD';
  }) {
    await this.emailService.sendConfirmationEmail({
      target,
      confirmationHash,
      confirmationType
    });
  }

  async sendVerificationEmail(payload: SendVerificationEmailEventDto) {
    const emailSettings = {
      changingEmail: ['EMAIL_CHANGE', 'FORGOT_PASSWORD'].includes(
        payload.confirmationType
      )
        ? payload.email
        : null,
      confirmationHash: payload.confirmationHash,
      confirmationType: payload.confirmationType as
        | 'EMAIL_CHANGE'
        | 'REGISTRATION'
        | 'FORGOT_PASSWORD'
    };

    await this.confirmHashRepository.create({
      userId: payload.userId,
      ...emailSettings
    });

    await this.sendEmail({
      target: payload.email,
      ...emailSettings
    });
  }

  async signUp(payload: SignUpEventDto) {
    await this.userSettingsRepository.create({
      userId: payload.userId
    });
    await this.sendVerificationEmail({
      confirmationHash: payload.confirmationHash,
      confirmationType: payload.confirmationType,
      userId: payload.userId,
      email: payload.email
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
        ...payload.data
      },
      { where: { id: payload.userId } }
    );
  }

  async changeEmail(payload: ChangeEmailEventDto) {
    await this.sendVerificationEmail({
      confirmationHash: payload.confirmationHash,
      confirmationType: payload.confirmationType,
      userId: payload.userId,
      email: payload.email
    });
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
