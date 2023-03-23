import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UserService } from '@modules/user.service';
import { SignInDto } from '@dto/sign-in.dto';
import { SignUpDto } from '@dto/sign-up.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('sign-up')
  signUp(@Body() payload: SignUpDto) {
    return this.userService.signUp(payload);
  }

  @Post('sign-in')
  signIn(@Body() payload: SignInDto) {
    return this.userService.signIn(payload);
  }
}
