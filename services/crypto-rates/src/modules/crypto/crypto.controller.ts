import { Controller } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { EventPattern } from '@nestjs/microservices';

@Controller('crypto')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @EventPattern('crypto_for_user_created')
  handleSignUp(data: any) {
    return this.cryptoService.signUp(data);
  }
}
