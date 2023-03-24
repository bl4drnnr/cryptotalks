import {Body, Controller, Post} from '@nestjs/common';
import {UserService} from '@modules/user.service';
import {SignUpDto} from '@dto/sign-up.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('sign-up')
  signUp(@Body() payload: SignUpDto) {
    return this.userService.signUp(payload);
  }

  @Post('/sign-in')
  async signIn(@Body() data: any): Promise<any> {
    const test = await this.userService.signIn(data);
    console.log('test', test);
    return test;
  }
}
