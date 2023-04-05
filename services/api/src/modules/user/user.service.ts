import * as bcryptjs from 'bcryptjs';
import * as crypto from 'crypto';
import { forwardRef, Inject, Injectable, OnModuleInit } from '@nestjs/common';
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
import { LogEvent } from '@events/log.event';
import { CloseAccEvent } from '@events/close-acc.event';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @Inject('USERS_SERVICE') private readonly userClient: ClientKafka,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
    @Inject('CRYPTO_SERVICE') private readonly cryptoClient: ClientKafka,
    @InjectModel(User) private readonly userRepository: typeof User,
    @InjectModel(ConfirmationHash)
    private readonly confirmHashRepository: typeof ConfirmationHash,
    private readonly validatorService: ValidatorService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService
  ) {}

  async signUp(payload: SignUpDto) {
    const alreadyExistingUser = await this.userRepository.findOne({
      where: { email: payload.email }
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

    this.authClient.emit(
      'log_auth_action',
      new LogEvent({
        event: 'SIGN_UP',
        message: `User ${payload.email} has successfully created an account.`,
        status: 'SUCCESS',
        timestamp: new Date()
      })
    );

    this.userClient.emit(
      'user_created',
      new UserSignUpEvent({
        email: payload.email,
        userId: createdUser.id,
        confirmationHash
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
      this.authClient.emit(
        'log_auth_action',
        new LogEvent({
          event: 'SIGN_IN',
          message: `User ${user.email} tried to log in while being unconfirmed.`,
          status: 'ERROR',
          timestamp: new Date()
        })
      );
      throw new AccountNotConfirmedException();
    }

    const passwordEquality = await bcryptjs.compare(
      payload.password,
      user.password
    );
    if (!passwordEquality) throw new WrongCredentialsException();

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
      this.authClient.emit(
        'log_auth_action',
        new LogEvent({
          event: 'CONFIRMATION',
          message: `User ${foundHash.id} tried to confirm account one more time.`,
          status: 'ERROR',
          timestamp: new Date()
        })
      );
      throw new EmailAlreadyConfirmedException();
    }

    this.authClient.emit(
      'log_auth_action',
      new LogEvent({
        event: 'CONFIRMATION',
        message: `User ${foundHash.id} has successfully confirmed an account.`,
        status: 'SUCCESS',
        timestamp: new Date()
      })
    );

    this.userClient.emit(
      'confirm_user_account',
      new ConfirmAccountEvent({
        hashId: foundHash.id,
        userId: foundHash.userId
      })
    );

    return new ResponseDto();
  }

  logout({ userId }: { userId: string }) {
    this.authClient.emit('user_logout', new UserLogoutEvent({ userId }));
    return new ResponseDto();
  }

  getUserById({ id }: { id: string }) {
    return this.userRepository.findByPk(id, {
      attributes: ['id', 'email']
    });
  }

  changeEmail({ userId, email }: { userId: string; email: string }) {
    this.userClient.emit('update_user_account', {});

    this.userClient.emit(
      'log_user_action',
      new LogEvent({
        event: 'USER',
        message: `User ${userId} has successfully changed email to ${email}`,
        status: 'SUCCESS',
        timestamp: new Date()
      })
    );

    return new ResponseDto();
  }

  changePassword({
    userId,
    password,
    passwordRepeat
  }: {
    userId: string;
    password: string;
    passwordRepeat: string;
  }) {
    this.userClient.emit('update_user_account', {});

    this.userClient.emit(
      'log_user_action',
      new LogEvent({
        event: 'USER',
        message: `User ${userId} has successfully changed password`,
        status: 'SUCCESS',
        timestamp: new Date()
      })
    );

    return new ResponseDto();
  }

  closeAccount({ userId }: { userId: string }) {
    this.userClient.emit(
      'log_user_action',
      new LogEvent({
        event: 'CLOSE_ACC',
        message: `User ${userId} has successfully closed an account.`,
        status: 'SUCCESS',
        timestamp: new Date()
      })
    );
    this.userClient.emit('close_user_account', new CloseAccEvent({ userId }));
    return new ResponseDto();
  }

  onModuleInit(): any {
    this.userClient.subscribeToResponseOf('user_created');
    this.userClient.subscribeToResponseOf('confirm_user_account');
    this.authClient.subscribeToResponseOf('update_tokens');
  }
}
