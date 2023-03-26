import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UseGuards
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
import { UpdateTokensDto } from '@dto/update-tokens.dto';
import { AccessTokenDto } from '@dto/access-token.dto';
import { RefreshTokenDto } from '@dto/refresh-token.dto';
import { TokenPayloadDto } from '@dto/token-payload.dto';
import { AccountConfirmationDto } from '@dto/account-confirmation.dto';
import { User } from '@models/user.model';
import { ConfirmationHash } from '@models/confirmation-hash.model';
import { Session } from '@models/session.model';
import { JwtGuard } from '@guards/jwt.guard';
import { UserDecorator } from '@decorators/user.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiExtraModels(User)
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
  @ApiExtraModels(AccessTokenDto)
  @ApiExtraModels(RefreshTokenDto)
  @ApiExtraModels(UpdateTokensDto)
  @ApiExtraModels(TokenPayloadDto)
  @ApiOperation({ summary: 'Responsible for user login' })
  @ApiResponse({
    status: 201,
    description: 'As a response function gets success message'
  })
  @Post('sign-in')
  async signIn(@Body() payload: SignInDto, @Res({ passthrough: true }) res) {
    const tokens = await this.userService.signIn(payload);

    res.cookie('_rt', tokens._rt);

    return { _at: tokens._at };
  }

  @ApiExtraModels(ConfirmationHash)
  @ApiExtraModels(AccountConfirmationDto)
  @ApiOperation({ summary: 'Confirm user registration' })
  @ApiResponse({
    status: 201,
    description: 'As a response function gets success message'
  })
  @Get('account-confirmation/:confirmationHash')
  confirmAccount(@Param('confirmationHash') confirmationHash: string) {
    return this.userService.confirmAccount({ confirmationHash });
  }

  @ApiOperation({ summary: 'Logouts user' })
  @ApiResponse({
    status: 201,
    description: 'As a response function gets success message'
  })
  @UseGuards(JwtGuard)
  @Post('logout')
  logout(@UserDecorator() userId: string, @Res() res) {
    res.clearCookie('_rt');
    return this.userService.logout({ userId });
  }

  @ApiOperation({ summary: 'Get user public profile' })
  @ApiResponse({
    status: 201,
    description: 'As a response returns only public data'
  })
  @Get('get/:id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById({ id });
  }

  @ApiOperation({ summary: 'Closes user profile (soft delete)' })
  @ApiResponse({
    status: 201,
    description: 'As a response returns success message'
  })
  @UseGuards(JwtGuard)
  @Patch('close-account')
  closeAccount(@UserDecorator() userId: string) {
    return this.userService.closeAccount({ userId });
  }
}
