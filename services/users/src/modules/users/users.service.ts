import * as bcryptjs from 'bcryptjs';
import * as crypto from 'crypto';
import {
  Inject,
  Injectable,
  NotFoundException,
  OnModuleInit
} from '@nestjs/common';
import { SignInDto } from '@dto/sign-in.dto';
import { SignUpDto } from '@dto/sign-up.dto';
import { User } from '@models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import { ValidatorService } from '@shared/validator.service';
import { ConfirmationHash } from '@models/confirmation-hash.model';
import { EmailService } from '@shared/email.service';
import { UpdateTokensEvent } from '@events/update-tokens.event';
import { WrongCredentialsException } from '@exceptions/wrong-credentials.exception';
import { AccountNotConfirmedException } from '@exceptions/account-not-confirmed.exception';
import { UserAlreadyExistsException } from '@exceptions/user-already-exists.exception';
import { TacNotAcceptedException } from '@exceptions/tac-not-accepted.exception';
import { ValidationErrorException } from '@exceptions/validation-error.exception';
import { EmailAlreadyConfirmedException } from '@exceptions/email-already-confirmed.exception';
import { ResponseDto } from '@dto/response.dto';
import { HashNotFoundException } from '@exceptions/hash-not-found.exception';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    @InjectModel(ConfirmationHash)
    private readonly confirmHashRepository: typeof ConfirmationHash,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
    private readonly validatorService: ValidatorService,
    private readonly emailService: EmailService
  ) {}

  async signIn(payload: SignInDto) {
    const user = await this.userRepository.findOne({
      where: { email: payload.email }
    });

    if (!user) throw new WrongCredentialsException();
    if (!user.accountConfirm) throw new AccountNotConfirmedException();

    const passwordEquality = bcryptjs.compare(payload.password, user.password);
    if (!passwordEquality) throw new WrongCredentialsException();

    return this.authClient.send(
      'update_tokens',
      new UpdateTokensEvent({
        userId: user.id,
        email: user.email
      })
    );
  }

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
    await this.confirmHashRepository.create({
      userId: createdUser.id,
      confirmationHash
    });
    await this.emailService.sendConfirmationEmail({
      target: payload.email,
      confirmationHash
    });

    return new ResponseDto();
  }

  async accountConfirmation({
    confirmationHash
  }: {
    confirmationHash: string;
  }) {
    const foundHash = await this.confirmHashRepository.findOne({
      where: { confirmationHash }
    });

    if (!foundHash) throw new HashNotFoundException();
    if (foundHash.confirmed) throw new EmailAlreadyConfirmedException();

    await this.confirmHashRepository.update(
      {
        confirmed: true
      },
      { where: { id: foundHash.id } }
    );

    await this.userRepository.update(
      {
        accountConfirm: true
      },
      { where: { id: foundHash.userId } }
    );

    return new ResponseDto();
  }

  async getUserById({ id }: { id: string }) {
    return await this.userRepository.findByPk(id);
  }

  onModuleInit(): any {
    this.authClient.subscribeToResponseOf('update_tokens');
  }
}
