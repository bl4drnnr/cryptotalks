import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CryptoService } from '@modules/crypto.service';

@ApiTags('Crypto')
@Controller('crypto')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}
}
