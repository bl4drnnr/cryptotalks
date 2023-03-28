import { Module } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { CryptoController } from './crypto.controller';

@Module({
  providers: [CryptoService],
  controllers: [CryptoController]
})
export class CryptoModule {}
