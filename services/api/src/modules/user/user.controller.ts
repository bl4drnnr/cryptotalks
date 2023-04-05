import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
  HttpStatus
} from '@nestjs/common';
import { UserService } from '@modules/user.service';
import { SignUpDto } from '@dto/sign-up.dto';
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { SignInDto } from '@dto/sign-in.dto';
import { User } from '@models/user.model';
import { ConfirmationHash } from '@models/confirmation-hash.model';
import { Session } from '@models/session.model';
import { JwtGuard } from '@guards/jwt.guard';
import { UserDecorator } from '@decorators/user.decorator';
import { ChangeEmailDto } from '@dto/change-email.dto';
import { ChangePasswordDto } from '@dto/change-password.dto';
import { CloseAccEventDto } from '@event-dto/close-acc.event.dto';
import { CloseAccEvent } from '@events/close-acc.event';
import { ConfirmAccountEvent } from '@events/confirm-account.event';
import { ConfirmAccountEventDto } from '@event-dto/confirm-account.event.dto';
import { UpdateUserEvent } from '@events/update-user.event';
import { UpdateUserEventDto } from '@event-dto/update-user.event.dto';
import { UserLogoutEvent } from '@events/user-logout.event';
import { UserLogoutEventDto } from '@event-dto/user-logout.event.dto';
import { SignUpEventDto } from '@event-dto/sign-up.event.dto';
import { UserSettings } from '@models/user-settings.model';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiExtraModels(SignUpEventDto)
  @ApiExtraModels(User)
  @ApiExtraModels(UserSettings)
  @ApiOperation({ summary: 'Responsible for user account creation' })
  @ApiResponse({
    status: 201,
    description: 'As a response function gets 2 tokens - refresh and access'
  })
  @Post('sign-up')
  signUp(@Body() payload: SignUpDto) {
    return this.userService.signUp(payload);
  }

  @ApiExtraModels(Session)
  @ApiOperation({ summary: 'Responsible for user login' })
  @ApiResponse({
    status: 201,
    description: 'As a response function returns success message'
  })
  @Post('sign-in')
  async signIn(@Body() payload: SignInDto, @Res({ passthrough: true }) res) {
    const { _at, _rt } = await this.userService.signIn(payload);

    res.cookie('_rt', _rt);

    return { _at };
  }

  @ApiExtraModels(ConfirmAccountEvent)
  @ApiExtraModels(ConfirmAccountEventDto)
  @ApiExtraModels(ConfirmationHash)
  @ApiOperation({ summary: 'Confirm user registration' })
  @ApiResponse({
    status: 201,
    description: 'As a response function returns success message'
  })
  @Get('account-confirmation/:confirmationHash')
  confirmAccount(@Param('confirmationHash') confirmationHash: string) {
    return this.userService.confirmAccount({ confirmationHash });
  }

  @ApiExtraModels(UserLogoutEvent)
  @ApiExtraModels(UserLogoutEventDto)
  @ApiOperation({ summary: 'Logouts user' })
  @ApiResponse({
    status: 201,
    description: 'As a response function returns success message'
  })
  @UseGuards(JwtGuard)
  @Get('logout')
  async logout(@UserDecorator() userId: string, @Res() res) {
    res.clearCookie('_rt');

    const response = this.userService.logout({ userId });

    return res.status(HttpStatus.OK).json(response);
  }

  @ApiExtraModels(UpdateUserEvent)
  @ApiExtraModels(UpdateUserEventDto)
  @ApiOperation({ summary: 'Changes user email address' })
  @ApiResponse({
    status: 201,
    description: 'As a response function returns success message'
  })
  @Post('change-email')
  @UseGuards(JwtGuard)
  changeEmail(
    @UserDecorator() userId: string,
    @Body() payload: ChangeEmailDto
  ) {
    return this.userService.changeEmail({ userId, ...payload });
  }

  @ApiOperation({ summary: 'Changes user password' })
  @ApiResponse({
    status: 201,
    description: 'As a response function returns success message'
  })
  @Post('change-password')
  @UseGuards(JwtGuard)
  changePassword(
    @UserDecorator() userId: string,
    @Body() payload: ChangePasswordDto
  ) {
    return this.userService.changePassword({ userId, ...payload });
  }

  @ApiExtraModels(CloseAccEvent)
  @ApiExtraModels(CloseAccEventDto)
  @ApiOperation({ summary: 'Closes are removes an account of an user' })
  @ApiResponse({
    status: 201,
    description: 'As a response function returns success message'
  })
  @UseGuards(JwtGuard)
  @Post('close-account')
  closeAccount(@UserDecorator() userId: string) {
    return this.userService.closeAccount({ userId });
  }

  @ApiOperation({ summary: 'Sets multi-factor authentication for user' })
  @ApiResponse({
    status: 201,
    description: 'As a response function returns success message'
  })
  @UseGuards(JwtGuard)
  @Post('set-2fa')
  setTwoFa(@UserDecorator() userId: string) {
    return this.userService.setTwoFa();
  }

  @ApiOperation({ summary: 'Removes multi-factor authentication for user' })
  @ApiResponse({
    status: 201,
    description: 'As a response function returns success message'
  })
  @UseGuards(JwtGuard)
  @Post('remove-2fa')
  removeTwoFa(@UserDecorator() userId: string) {
    return this.userService.removeTwoFa();
  }
}
