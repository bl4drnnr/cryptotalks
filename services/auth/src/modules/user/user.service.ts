import * as bcryptjs from 'bcryptjs';
import * as crypto from 'crypto';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable
} from '@nestjs/common';
import { SignInRequest } from '@user/dto/sign-in/request.dto';
import { WrongCredentialsException } from '@user/exceptions/wrong-credentials.exception';
import { AccountNotConfirmedException } from '@user/exceptions/account-not-confirmed.exception';
import { AuthService } from '@auth/auth.service';
import { SignUpRequest } from '@user/dto/sign-up/request.dto';
import { UserAlreadyExistsException } from '@user/exceptions/user-already-exists.exception';
import { TacNotAcceptedException } from '@user/exceptions/tac-not-accepted.exception';
import { ValidationErrorException } from '@user/exceptions/validation-error.exception';
import { EmailAlreadyConfirmedException } from '@user/exceptions/email-already-confirmed.exception';
import { ValidatorService } from '@shared/validator.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly validatorService: ValidatorService
  ) {}

  async singIn(payload: SignInRequest) {
    // const user = await this.prisma.users.findFirst({
    //   where: { email: payload.email }
    // });
    // if (!user) throw new WrongCredentialsException();
    // if (!user.accountConfirm) throw new AccountNotConfirmedException();
    // const passwordEquality = await bcryptjs.compare(
    //   payload.password,
    //   user.password
    // );
    // if (!passwordEquality) throw new WrongCredentialsException();
    // return await this.authService.updateTokens({
    //   userId: user.id,
    //   email: user.email
    // });
  }

  async signUp(payload: SignUpRequest) {
    // const alreadyExistingUser = await this.prisma.users.findFirst({
    //   where: { email: payload.email }
    // });
    // if (alreadyExistingUser) throw new UserAlreadyExistsException();
    //
    // if (!payload.tac) throw new TacNotAcceptedException();
    //
    // if (
    //   !this.validatorService.validateEmail(payload.email) ||
    //   !this.validatorService.validatePassword(payload.password)
    // )
    //   throw new ValidationErrorException();
    //
    // const hashedPassword = await bcryptjs.hash(payload.password, 10);
    // const userNumber = Math.round(Math.random() * 1e10).toString();
    //
    // const createdUser = await this.prisma.users.create({
    //   data: {
    //     ...payload,
    //     userNumber,
    //     password: hashedPassword
    //   }
    // });
    //
    // const confirmHash = crypto.randomBytes(20).toString('hex');
    // await this.prisma.confirmationHashes.create({
    //   data: { userId: createdUser.id, confirmHash }
    // });
    // await this.emailService.sendConfirmationEmail({
    //   target: payload.email,
    //   confirmHash
    // });
    //
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
    return await this.authService.deleteRefreshToken(userId);
  }
}
