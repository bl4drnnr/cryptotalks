import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards
} from '@nestjs/common';
import { UserService } from '@user/user.service';
import { JwtGuard } from '@guards/jwt.guard';
import { FastifyReply } from 'fastify';
import { UserDecorator } from '@decorators/user.decorator';
import { AccountConfirmationRequest } from '@user/dto/account-confirmation/request.dto';
import { AccountConfirmationResponse } from '@user/dto/account-confirmation/response.dto';
import { LogoutResponse } from '@user/dto/logout/response.dto';
import { SignInRequest } from '@user/dto/sign-in/request.dto';
import { SignInResponse } from '@user/dto/sign-in/response.dto';
import { SignUpResponse } from '@user/dto/sign-up/response.dto';
import { SignUpRequest } from '@user/dto/sign-up/request.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-in')
  async signIn(
    @Res({ passthrough: true }) res: FastifyReply,
    @Body() payload: SignInRequest
  ) {
    // const { _at, _rt } = await this.userService.singIn(payload);
    // res.cookie('_rt', _rt);
    // return new SignInResponse(_at);
  }

  @Post('sign-up')
  async signUp(@Body() payload: SignUpRequest) {
    await this.userService.signUp(payload);

    return new SignUpResponse();
  }

  @Post('logout')
  @UseGuards(JwtGuard)
  async logout(
    @UserDecorator() userId: string,
    @Res({ passthrough: true }) res: FastifyReply
  ) {
    res.clearCookie('_rt');
    await this.userService.logout(userId);

    return new LogoutResponse();
  }

  @Get('account-confirmation/:confirmHash')
  async accountConfirmation(
    @Param() { confirmHash }: AccountConfirmationRequest
  ) {
    await this.userService.accountConfirmation({ confirmHash });

    return new AccountConfirmationResponse();
  }
}
