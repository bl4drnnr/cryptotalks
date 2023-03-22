import { Controller, Post } from '@nestjs/common';
import { UserService } from '@modules/user.service';
import { SignInDto } from '@dto/sign-in.dto';
import { SignUpDto } from '@dto/sign-up.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('sign-up')
  signUp(payload: SignUpDto) {
    return this.userService.signUp(payload);
  }
}
