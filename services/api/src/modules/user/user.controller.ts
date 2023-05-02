import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
  HttpStatus,
  Patch
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
import { CloseAccEventDto } from '@events/close-acc.event';
import { ConfirmAccountEventDto } from '@events/confirm-account.event';
import { UpdateUserEventDto } from '@events/update-user.event';
import { UserLogoutEventDto } from '@events/user-logout.event';
import { UserSettings } from '@models/user-settings.model';
import { Set2faDto } from '@dto/set-2fa.dto';
import { Remove2faDto } from '@dto/remove-2fa.dto';
import { ResponseDto } from '@dto/response.dto';
import { SetPhoneDto } from '@dto/set-phone.dto';
import { RemovePhoneDto } from '@dto/remove-phone.dto';
import { SignUpEventDto } from '@events/user-sign-up.event';
import { ForgotPasswordDto } from '@dto/forgot-password.dto';
import { SendVerificationEmailEventDto } from '@events/send-verification-email.event';
import { CloseAccountDto } from '@dto/close-account.dto';
import { UploadPhotoDto } from '@dto/upload-photo.dto';

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
    const response = await this.userService.signIn(payload);

    if (response instanceof ResponseDto) {
      return response;
    } else if ('_rt' in response && '_at' in response) {
      res.cookie('_rt', response._rt);

      return { _at: response._at };
    }
  }

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

  @ApiOperation({ summary: 'Confirm email change' })
  @ApiResponse({
    status: 201,
    description: 'As a response function returns success message'
  })
  @Get('email-change-confirmation/:confirmationHash')
  confirmEmailChange(@Param('confirmationHash') confirmationHash: string) {
    return this.userService.confirmEmailChange({ confirmationHash });
  }

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
    return this.userService.changeEmail({ userId, payload });
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
    return this.userService.changePassword({ userId, payload });
  }

  @ApiExtraModels(SendVerificationEmailEventDto)
  @ApiOperation({ summary: 'Initiates password reset' })
  @ApiResponse({
    status: 201,
    description: 'As a response function returns success message'
  })
  @Post('forgot-password')
  forgotPassword(@Body() payload: ForgotPasswordDto) {
    return this.userService.forgotPassword({ ...payload });
  }

  @ApiExtraModels(CloseAccEventDto)
  @ApiOperation({ summary: 'Closes are removes an account of an user' })
  @ApiResponse({
    status: 201,
    description: 'As a response function returns success message'
  })
  @UseGuards(JwtGuard)
  @Post('close-account')
  closeAccount(
    @UserDecorator() userId: string,
    @Body() payload: CloseAccountDto
  ) {
    return this.userService.closeAccount({ userId, ...payload });
  }

  @ApiOperation({ summary: 'Sets multi-factor authentication for user' })
  @ApiResponse({
    status: 201,
    description: 'As a response function returns success message'
  })
  @UseGuards(JwtGuard)
  @Post('set-2fa')
  setTwoFa(@UserDecorator() userId: string, @Body() payload: Set2faDto) {
    return this.userService.setTwoFa({ userId, ...payload });
  }

  @ApiOperation({ summary: 'Removes multi-factor authentication for user' })
  @ApiResponse({
    status: 201,
    description: 'As a response function returns success message'
  })
  @UseGuards(JwtGuard)
  @Post('remove-2fa')
  removeTwoFa(@UserDecorator() userId: string, @Body() payload: Remove2faDto) {
    return this.userService.removeTwoFa({ userId, ...payload });
  }

  @ApiOperation({
    summary: 'Sets multi-factor authentication for user (phone)'
  })
  @ApiResponse({
    status: 201,
    description: 'As a response function returns success message'
  })
  @UseGuards(JwtGuard)
  @Post('set-phone')
  setPhone(@UserDecorator() userId: string, @Body() payload: SetPhoneDto) {
    return this.userService.setPhone({ userId, ...payload });
  }

  @ApiOperation({ summary: 'Removes phone from user account' })
  @ApiResponse({
    status: 201,
    description: 'As a response function returns success message'
  })
  @UseGuards(JwtGuard)
  @Post('remove-phone')
  removePhone(
    @UserDecorator() userId: string,
    @Body() payload: RemovePhoneDto
  ) {
    return this.userService.removePhone({ userId, ...payload });
  }

  @ApiOperation({
    summary: 'Allows to get user settings in order to change them'
  })
  @ApiResponse({
    status: 201,
    description:
      'As a response function returns both security settings and personal information'
  })
  @UseGuards(JwtGuard)
  @Get('get-settings')
  getUserSettings(@UserDecorator() userId: string) {
    return this.userService.getUserSettings({ userId });
  }

  @ApiOperation({ summary: 'Sets user personal information settings' })
  @ApiResponse({
    status: 201,
    description: 'As a response function returns success message'
  })
  @UseGuards(JwtGuard)
  @Patch('set-personal-settings')
  setPersonalSettings(
    @UserDecorator() userId: string,
    @Body() payload: UpdateUserEventDto
  ) {
    return this.userService.setPersonalSettings({ userId, ...payload });
  }

  @ApiOperation({ summary: 'Uploads user avatar image' })
  @ApiResponse({
    status: 201,
    description: 'As a response function returns success message'
  })
  @UseGuards(JwtGuard)
  @Post('upload-photo')
  uploadPhoto(
    @UserDecorator() userId: string,
    @Body() payload: UploadPhotoDto
  ) {
    return this.userService.uploadPhoto({ userId, photo: payload.photo });
  }
}
