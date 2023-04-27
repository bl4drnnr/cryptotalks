import * as bcryptjs from 'bcryptjs';
import * as crypto from 'crypto';
import * as node2fa from 'node-2fa';
import * as dayjs from 'dayjs';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { SignUpDto } from '@dto/sign-up.dto';
import { UserSignUpEvent } from '@events/user-sign-up.event';
import { SignInDto } from '@dto/sign-in.dto';
import { ConfirmAccountEvent } from '@events/confirm-account.event';
import { UserLogoutEvent } from '@events/user-logout.event';
import { ResponseDto } from '@dto/response.dto';
import { UserAlreadyExistsException } from '@exceptions/user-already-exists.exception';
import { TacNotAcceptedException } from '@exceptions/tac-not-accepted.exception';
import { ValidationErrorException } from '@exceptions/validation-error.exception';
import { User } from '@models/user.model';
import { ConfirmationHash } from '@models/confirmation-hash.model';
import { InjectModel } from '@nestjs/sequelize';
import { ValidatorService } from '@shared/validator.service';
import { WrongCredentialsException } from '@exceptions/wrong-credentials.exception';
import { AccountNotConfirmedException } from '@exceptions/account-not-confirmed.exception';
import { HashNotFoundException } from '@exceptions/hash-not-found.exception';
import { EmailAlreadyConfirmedException } from '@exceptions/email-already-confirmed.exception';
import { AuthService } from '@modules/auth.service';
import { CloseAccEvent } from '@events/close-acc.event';
import { UpdateUserEvent, UpdateUserEventDto } from '@events/update-user.event';
import { UserSettings } from '@models/user-settings.model';
import { EmailChangedException } from '@exceptions/email-changed.exception';
import sequelize, { Op } from 'sequelize';
import {
  UpdateUserSecurityEvent,
  UpdateUserSecurityEventDto
} from '@events/update-user-security.event';
import { LoggerService } from '@shared/logger.service';
import { Wrong2faException } from '@exceptions/wrong-2fa.exception';
import { PhoneCodeErrorException } from '@exceptions/phone-code-error.exception';
import { ChangeEmailDto } from '@dto/change-email.dto';
import { ChangePasswordDto } from '@dto/change-password.dto';
import { ChangeEmailEvent } from '@events/change-email.event';
import { EmailChangeConfirmedException } from '@exceptions/email-change-confirmed.exception';
import { ForgotPasswordDto } from '@dto/forgot-password.dto';
import { SendVerificationEmailEvent } from '@events/send-verification-email.event';

@Injectable()
export class UserService {
  constructor(
    @Inject('USERS_SERVICE') private readonly userClient: ClientKafka,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
    @Inject('CRYPTO_SERVICE') private readonly cryptoClient: ClientKafka,
    @InjectModel(User) private readonly userRepository: typeof User,
    @InjectModel(UserSettings)
    private readonly userSettingsRepository: typeof UserSettings,
    @InjectModel(ConfirmationHash)
    private readonly confirmHashRepository: typeof ConfirmationHash,
    private readonly validatorService: ValidatorService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly loggerService: LoggerService
  ) {}

  async signUp(payload: SignUpDto) {
    const alreadyExistingUser = await this.userRepository.findOne({
      where: {
        [Op.or]: [
          {
            email: payload.email
          },
          {
            username: payload.username
          }
        ]
      }
    });
    if (alreadyExistingUser) throw new UserAlreadyExistsException();

    if (!payload.tac) throw new TacNotAcceptedException();

    if (
      !this.validatorService.validateEmail(payload.email) ||
      !this.validatorService.validatePassword(payload.password)
    )
      throw new ValidationErrorException();

    const hashedPassword = await bcryptjs.hash(payload.password, 10);

    const createdUser = await this.userRepository.create({
      ...payload,
      password: hashedPassword
    });

    const confirmationHash = crypto.randomBytes(20).toString('hex');

    this.loggerService.log({
      action: 'log_auth_action',
      event: 'SIGN_UP',
      status: 'SUCCESS',
      payload: { email: payload.email }
    });

    this.userClient.emit(
      'user_created',
      new UserSignUpEvent({
        email: payload.email,
        userId: createdUser.id,
        confirmationHash,
        confirmationType: 'REGISTRATION'
      })
    );

    this.cryptoClient.emit(
      'crypto_for_user_created',
      new UserSignUpEvent({
        userId: createdUser.id
      })
    );

    return new ResponseDto();
  }

  async signIn(payload: SignInDto) {
    const user = await this.userRepository.findOne({
      where: { email: payload.email }
    });

    if (!user) throw new WrongCredentialsException();
    if (!user.accountConfirm) {
      this.loggerService.log({
        action: 'log_auth_action',
        event: 'SIGN_IN',
        status: 'ERROR',
        payload: { email: user.email }
      });
      throw new AccountNotConfirmedException();
    }

    const passwordEquality = await bcryptjs.compare(
      payload.password,
      user.password
    );
    if (!passwordEquality) throw new WrongCredentialsException();

    const userSecuritySettings = await this.userSettingsRepository.findOne({
      where: { userId: user.id }
    });

    if (userSecuritySettings.twoFaToken && !payload.twoFaCode) {
      return new ResponseDto('two-fa-required');
    } else if (userSecuritySettings.twoFaToken && payload.twoFaCode) {
      const tokenVerification = node2fa.verifyToken(
        userSecuritySettings.twoFaToken,
        payload.twoFaCode
      );

      if (!tokenVerification || tokenVerification.delta !== 0)
        throw new Wrong2faException();
    } else if (userSecuritySettings.phone && !payload.code) {
      this.userClient.emit(
        'send_verification_mobile_code',
        new UpdateUserSecurityEvent({
          userId: user.id,
          phone: userSecuritySettings.phone
        })
      );

      return new ResponseDto('phone-two-fa-required');
    } else if (userSecuritySettings.phone && payload.code) {
      const { phoneVerificationCode, verificationCodeCreatedAt } =
        await this.userSettingsRepository.findOne({
          where: { userId: user.id }
        });

      const time = dayjs(verificationCodeCreatedAt);
      const timeDifferenceInMinutes = dayjs().diff(time, 'minute');

      if (payload.code !== phoneVerificationCode || timeDifferenceInMinutes > 5)
        throw new PhoneCodeErrorException();

      await this.userSettingsRepository.update(
        {
          phoneVerificationCode: null,
          verificationCodeCreatedAt: null
        },
        { where: { userId: user.id } }
      );
    }

    return this.authService.updateTokens({
      userId: user.id,
      email: user.email
    });
  }

  async confirmAccount({ confirmationHash }: { confirmationHash: string }) {
    const foundHash = await this.confirmHashRepository.findOne({
      where: { confirmationHash }
    });

    if (!foundHash) throw new HashNotFoundException();
    if (foundHash.confirmed) {
      this.loggerService.log({
        action: 'log_auth_action',
        event: 'CONFIRMATION',
        status: 'ERROR',
        payload: { hashId: foundHash.id }
      });
      throw new EmailAlreadyConfirmedException();
    }

    this.loggerService.log({
      action: 'log_auth_action',
      event: 'CONFIRMATION',
      status: 'SUCCESS',
      payload: { hashId: foundHash.id }
    });

    this.userClient.emit(
      'confirm_user_account',
      new ConfirmAccountEvent({
        hashId: foundHash.id,
        userId: foundHash.userId,
        data: { accountConfirm: true }
      })
    );

    return new ResponseDto();
  }

  async confirmEmailChange({ confirmationHash }: { confirmationHash: string }) {
    const foundHash = await this.confirmHashRepository.findOne({
      where: { confirmationHash }
    });

    if (!foundHash) throw new HashNotFoundException();
    if (foundHash.confirmed) {
      this.loggerService.log({
        action: 'log_auth_action',
        event: 'CONFIRMATION',
        status: 'ERROR',
        payload: { hashId: foundHash.id }
      });
      throw new EmailChangeConfirmedException();
    }

    this.loggerService.log({
      action: 'log_auth_action',
      event: 'CONFIRMATION',
      status: 'SUCCESS',
      payload: { hashId: foundHash.id }
    });

    this.userClient.emit(
      'confirm_user_account',
      new ConfirmAccountEvent({
        hashId: foundHash.id,
        userId: foundHash.userId,
        data: { email: foundHash.changingEmail }
      })
    );

    this.userClient.emit(
      'update_user_security_settings',
      new UpdateUserSecurityEvent({
        userId: foundHash.userId,
        emailChanged: true
      })
    );

    return new ResponseDto();
  }

  logout({ userId }: { userId: string }) {
    this.authClient.emit('user_logout', new UserLogoutEvent({ userId }));
    return new ResponseDto();
  }

  getUserPersonalInformation({ id }: { id: string }) {
    return this.userRepository.findByPk(id, {
      attributes: [
        'id',
        'email',
        [sequelize.literal('first_name'), 'firstName'],
        [sequelize.literal('last_name'), 'lastName'],
        'twitter',
        [sequelize.literal('linked_in'), 'linkedIn'],
        [sequelize.literal('personal_website'), 'personalWebsite'],
        'title',
        'bio',
        'username',
        'created_at'
      ]
    });
  }

  async changeEmail({
    userId,
    payload
  }: {
    userId: string;
    payload: ChangeEmailDto;
  }) {
    const existingUser = await this.userRepository.findOne({
      where: { email: payload.email }
    });
    if (existingUser) throw new UserAlreadyExistsException();

    const currentUser = await this.userSettingsRepository.findOne({
      where: { userId }
    });
    if (currentUser.emailChanged) throw new EmailChangedException();

    if (!this.validatorService.validateEmail(payload.email))
      throw new ValidationErrorException();

    const securitySettings = await this.userSettingsRepository.findOne({
      where: { userId }
    });

    if (securitySettings.twoFaToken && !payload.twoFaCode) {
      return new ResponseDto('two-fa-required');
    } else if (securitySettings.twoFaToken && payload.twoFaCode) {
      const tokenVerification = node2fa.verifyToken(
        securitySettings.twoFaToken,
        payload.twoFaCode
      );

      if (!tokenVerification || tokenVerification.delta !== 0)
        throw new Wrong2faException();
    } else if (securitySettings.phone && !payload.code) {
      this.userClient.emit(
        'send_verification_mobile_code',
        new UpdateUserSecurityEvent({
          userId,
          phone: securitySettings.phone
        })
      );

      return new ResponseDto('phone-two-fa-required');
    } else if (securitySettings.phone && payload.code) {
      const { phoneVerificationCode, verificationCodeCreatedAt } =
        await this.userSettingsRepository.findOne({
          where: { userId }
        });

      const time = dayjs(verificationCodeCreatedAt);
      const timeDifferenceInMinutes = dayjs().diff(time, 'minute');

      if (payload.code !== phoneVerificationCode || timeDifferenceInMinutes > 5)
        throw new PhoneCodeErrorException();
    }

    const confirmationHash = crypto.randomBytes(20).toString('hex');
    this.userClient.emit(
      'change_email',
      new ChangeEmailEvent({
        userId,
        confirmationHash,
        email: payload.email,
        confirmationType: 'EMAIL_CHANGE'
      })
    );

    this.loggerService.log({
      action: 'log_user_action',
      event: 'USER',
      status: 'SUCCESS',
      payload: { userId, email: payload.email }
    });

    return new ResponseDto();
  }

  async changePassword({
    userId,
    payload
  }: {
    userId: string;
    payload: ChangePasswordDto;
  }) {
    if (
      !this.validatorService.validatePassword(payload.password) ||
      !this.validatorService.validatePassword(payload.passwordRepeat) ||
      payload.passwordRepeat !== payload.password
    )
      throw new ValidationErrorException();

    const userSettings = await this.userSettingsRepository.findOne({
      where: { userId }
    });

    if (userSettings.phone && !payload.code) {
      this.userClient.emit(
        'send_verification_mobile_code',
        new UpdateUserSecurityEvent({
          userId,
          phone: userSettings.phone
        })
      );

      return new ResponseDto('code-sent');
    } else if (userSettings.phone && payload.code) {
      const { phoneVerificationCode, verificationCodeCreatedAt } =
        await this.userSettingsRepository.findOne({
          where: { userId }
        });

      const time = dayjs(verificationCodeCreatedAt);
      const timeDifferenceInMinutes = dayjs().diff(time, 'minute');

      if (payload.code !== phoneVerificationCode || timeDifferenceInMinutes > 5)
        throw new PhoneCodeErrorException();
    } else if (userSettings.twoFaToken && !payload.twoFaCode) {
      return new ResponseDto('two-fa-required');
    } else if (userSettings.twoFaToken && payload.twoFaCode) {
      const tokenVerification = node2fa.verifyToken(
        userSettings.twoFaToken,
        payload.twoFaCode
      );

      if (!tokenVerification || tokenVerification.delta !== 0)
        throw new Wrong2faException();
    } else {
      throw new BadRequestException();
    }

    const hashedPassword = await bcryptjs.hash(payload.password, 10);

    this.userClient.emit(
      'update_user_account',
      new UpdateUserEvent({
        userId,
        password: hashedPassword
      })
    );

    this.userClient.emit(
      'update_user_security_settings',
      new UpdateUserSecurityEvent({
        userId,
        passwordChanged: new Date()
      })
    );

    this.loggerService.log({
      action: 'log_user_action',
      event: 'USER',
      status: 'SUCCESS',
      payload: { userId }
    });

    return new ResponseDto();
  }

  async forgotPassword(payload: ForgotPasswordDto) {
    if (
      !payload.email ||
      !payload.phone ||
      !this.validatorService.validateEmail(payload.email)
    )
      throw new BadRequestException('bad-request', 'Bad request');

    if (payload.email && !payload.verificationString) {
      const user = await this.userRepository.findOne({
        where: { email: payload.email }
      });

      if (!user) return new ResponseDto('sent');

      this.userClient.emit(
        'send_verification_email',
        new SendVerificationEmailEvent({
          email: user.email,
          confirmationType: 'FORGOT_PASSWORD',
          userId: user.id,
          confirmationHash: crypto.randomBytes(20).toString('hex')
        })
      );

      return new ResponseDto('sent');
    } else if (payload.email && payload.verificationString) {
      const userConfirmationHash = await this.confirmHashRepository.findOne({
        where: {
          confirmationHash: payload.verificationString,
          confirmationType: 'FORGOT_PASSWORD'
        }
      });

      if (!userConfirmationHash)
        throw new BadRequestException('wrong-hash', 'Wrong hash');
    } else if (payload.phone && !payload.verificationString) {
      const userSettings = await this.userSettingsRepository.findOne({
        where: { phone: payload.phone }
      });

      if (!userSettings) return new ResponseDto('sent');

      this.userClient.emit(
        'send_verification_mobile_code',
        new UpdateUserSecurityEvent({
          userId: userSettings.id,
          phone: userSettings.phone
        })
      );

      return new ResponseDto('sent');
    } else if (payload.phone && payload.verificationString) {
      const userSettings = await this.userSettingsRepository.findOne({
        where: { phone: payload.phone }
      });

      if (
        !userSettings ||
        userSettings.phoneVerificationCode !== payload.verificationString
      )
        return new PhoneCodeErrorException();
    }

    return new ResponseDto();
  }

  closeAccount({ userId }: { userId: string }) {
    this.loggerService.log({
      action: 'log_user_action',
      event: 'CLOSE_ACC',
      status: 'SUCCESS',
      payload: { userId }
    });

    this.userClient.emit('close_user_account', new CloseAccEvent({ userId }));

    return new ResponseDto();
  }

  async setTwoFa(payload: UpdateUserSecurityEventDto) {
    const { twoFaToken, phone } = await this.userSettingsRepository.findOne({
      where: { userId: payload.userId }
    });

    if (twoFaToken || phone) throw new BadRequestException();

    const tokenVerification = node2fa.verifyToken(
      payload.twoFaToken,
      payload.twoFaCode
    );

    if (!tokenVerification || tokenVerification.delta !== 0)
      throw new Wrong2faException();

    this.loggerService.log({
      action: 'log_user_action',
      event: 'SECURITY',
      status: 'SUCCESS',
      payload: { ...payload }
    });
    this.userClient.emit(
      'update_user_security_settings',
      new UpdateUserSecurityEvent({ ...payload })
    );
    return new ResponseDto();
  }

  async removeTwoFa(payload: UpdateUserSecurityEventDto) {
    const { twoFaToken } = await this.userSettingsRepository.findOne({
      where: { userId: payload.userId }
    });

    const tokenVerification = node2fa.verifyToken(
      twoFaToken,
      payload.twoFaCode
    );

    if (!tokenVerification || tokenVerification.delta !== 0)
      throw new Wrong2faException();

    payload.twoFaToken = null;

    this.loggerService.log({
      action: 'log_user_action',
      event: 'SECURITY',
      status: 'SUCCESS',
      payload: { ...payload }
    });
    this.userClient.emit(
      'update_user_security_settings',
      new UpdateUserSecurityEvent({ ...payload })
    );
    return new ResponseDto();
  }

  async setPhone(payload: UpdateUserSecurityEventDto) {
    const { twoFaToken, phone } = await this.userSettingsRepository.findOne({
      where: { userId: payload.userId }
    });

    if (twoFaToken || phone) throw new BadRequestException();

    if (!payload.code) {
      this.userClient.emit(
        'send_verification_mobile_code',
        new UpdateUserSecurityEvent({
          userId: payload.userId,
          phone: payload.phone
        })
      );
      return new ResponseDto('code-sent');
    } else if (payload.code) {
      const { phoneVerificationCode, verificationCodeCreatedAt } =
        await this.userSettingsRepository.findOne({
          where: { userId: payload.userId }
        });

      const time = dayjs(verificationCodeCreatedAt);
      const timeDifferenceInMinutes = dayjs().diff(time, 'minute');

      if (payload.code !== phoneVerificationCode || timeDifferenceInMinutes > 5)
        throw new PhoneCodeErrorException();

      await this.userSettingsRepository.update(
        {
          phoneVerificationCode: null,
          verificationCodeCreatedAt: null
        },
        { where: { userId: payload.userId } }
      );

      this.userClient.emit(
        'update_user_security_settings',
        new UpdateUserSecurityEvent({
          userId: payload.userId,
          phone: payload.phone
        })
      );
      return new ResponseDto();
    }
  }

  async removePhone(payload: UpdateUserSecurityEventDto) {
    const { phone } = await this.userSettingsRepository.findOne({
      where: { userId: payload.userId }
    });

    if (!phone) throw new BadRequestException();

    if (!payload.code) {
      this.userClient.emit(
        'send_verification_mobile_code',
        new UpdateUserSecurityEvent({
          userId: payload.userId,
          phone
        })
      );
      return new ResponseDto('code-sent');
    } else if (payload.code) {
      const { phoneVerificationCode, verificationCodeCreatedAt } =
        await this.userSettingsRepository.findOne({
          where: { userId: payload.userId }
        });

      const time = dayjs(verificationCodeCreatedAt);
      const timeDifferenceInMinutes = dayjs().diff(time, 'minute');

      if (payload.code !== phoneVerificationCode || timeDifferenceInMinutes > 5)
        throw new PhoneCodeErrorException();

      this.userClient.emit(
        'update_user_security_settings',
        new UpdateUserSecurityEvent({
          userId: payload.userId,
          phone: null
        })
      );
      return new ResponseDto();
    }
  }

  async getUserSettings({ userId }: { userId: string }) {
    const userPersonalSettings = await this.userRepository.findByPk(userId, {
      attributes: [
        'id',
        'email',
        [sequelize.literal('first_name'), 'firstName'],
        [sequelize.literal('last_name'), 'lastName'],
        'username',
        'twitter',
        [sequelize.literal('linked_in'), 'linkedIn'],
        [sequelize.literal('personal_website'), 'personalWebsite'],
        'title',
        'bio',
        [sequelize.literal('created_at'), 'createdAt']
      ]
    });

    const userSecuritySettings = await this.userSettingsRepository.findOne({
      where: { userId },
      attributes: [
        'phone',
        [sequelize.literal('public_email'), 'publicEmail'],
        [sequelize.literal('email_changed'), 'emailChanged'],
        [sequelize.literal('password_changed'), 'passwordChanged'],
        [sequelize.literal('two_fa_token'), 'twoFaToken']
      ]
    });

    const securitySettings = {
      publicEmail: userSecuritySettings.publicEmail,
      emailChanged: userSecuritySettings.emailChanged,
      passwordChanged: userSecuritySettings.passwordChanged,
      phone: userSecuritySettings.phone,
      email: userPersonalSettings.email,
      twoFaToken: !!userSecuritySettings.twoFaToken
    };
    delete userPersonalSettings.email;

    return { securitySettings, personalSettings: userPersonalSettings };
  }

  async setPersonalSettings(payload: UpdateUserEventDto) {
    const existingUser = await this.userRepository.findOne({
      where: { username: payload.username }
    });

    if (existingUser && existingUser.id !== payload.userId) {
      throw new UserAlreadyExistsException(
        'username-taken',
        'Username is taken'
      );
    }

    this.loggerService.log({
      action: 'log_user_action',
      event: 'SETTINGS',
      status: 'SUCCESS',
      payload: { userId: payload.userId, payload: JSON.stringify(payload) }
    });

    this.userClient.emit(
      'update_user_account',
      new UpdateUserEvent({ ...payload })
    );

    return new ResponseDto();
  }
}
