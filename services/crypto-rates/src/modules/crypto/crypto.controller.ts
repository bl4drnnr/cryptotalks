import { Controller } from '@nestjs/common';
import {CryptoService} from "./crypto.service";
import {EventPattern} from "@nestjs/microservices";

@Controller('crypto')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @EventPattern('user_created')
  handleSignUp(data: any) {
    //
  }
}
