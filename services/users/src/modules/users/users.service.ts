import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { SignUpEventDto } from '@event-dto/sign-up-event.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ClientKafka } from '@nestjs/microservices';
import { ConfirmationHash } from '@models/confirmation-hash.model';
import { UserSettings } from '@models/user-settings.model';
import { EmailService } from '@shared/email.service';
import { User } from '@models/user.model';
import { ConfirmAccountEventDto } from '@event-dto/confirm-account-event.dto';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    @InjectModel(UserSettings)
    private readonly userSettingsRepository: typeof UserSettings,
    @InjectModel(ConfirmationHash)
    private readonly confirmHashRepository: typeof ConfirmationHash,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
    private readonly emailService: EmailService
  ) {}

  async signUp(payload: SignUpEventDto) {
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

  async getUserById({ id }: { id: string }) {
    // return await this.userRepository.findByPk(id);
  }

  onModuleInit(): any {
    this.authClient.subscribeToResponseOf('update_tokens');
  }
}
