import { Controller } from '@nestjs/common';
import {AuthService} from "@modules/auth.service";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
}
