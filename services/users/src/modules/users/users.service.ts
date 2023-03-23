import * as bcryptjs from 'bcryptjs';
import * as crypto from 'crypto';
import { Inject, Injectable } from '@nestjs/common';
import { SignInDto } from '@modules/dto/sign-in/request.dto';
import { SignUpDto } from '@modules/dto/sign-up/request.dto';
import { User } from '@models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { WrongCredentialsException } from '@modules/exceptions/wrong-credentials.exception';
import { AccountNotConfirmedException } from '@modules/exceptions/account-not-confirmed.exception';
import { ClientKafka } from '@nestjs/microservices';
import { UserAlreadyExistsException } from '@modules/exceptions/user-already-exists.exception';
import { TacNotAcceptedException } from '@modules/exceptions/tac-not-accepted.exception';
import { ValidationErrorException } from '@modules/exceptions/validation-error.exception';
import { ValidatorService } from '@shared/validator.service';
import { ConfirmationHash } from '@models/confirmation-hash.model';
import { EmailService } from '@shared/email.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    @InjectModel(ConfirmationHash)
    private readonly confirmHashRepository: typeof ConfirmationHash,
    // @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
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
    // return await this.authService.updateTokens({
    //   userId: user.id,
    //   email: user.email
    // });
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

    // return { message: 'success' };
  }

  async accountConfirmation({ confirmHash }: { confirmHash: string }) {
    // const confirmationHash = await this.prisma.confirmationHashes.findFirst({
    //   where: { confirmHash },
    //   include: { user: true }
    // });
    //
    // if (!confirmationHash) throw new BadRequestException();
    // if (confirmationHash.confirmed) throw new EmailAlreadyConfirmedException();
    //
    // await this.prisma.confirmationHashes.update({
    //   where: { id: confirmationHash.id },
    //   data: {
    //     confirmed: true,
    //     user: {
    //       update: {
    //         accountConfirm: true
    //       }
    //     }
    //   }
    // });
  }

  async logout(userId: string) {
    // return await this.authService.deleteRefreshToken(userId);
  }
}