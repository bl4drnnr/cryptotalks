import { Controller } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { EventPattern } from '@nestjs/microservices';

@Controller('crypto')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @EventPattern('crypto_for_user_created')
  handleCryptoForUserCreated(data: any) {
    return this.cryptoService.handleCryptoForUserCreated(data);
  }

  @EventPattern('add_crypto_to_favorite')
  handleAddCryptoToFavorite(data: any) {
    return this.cryptoService.handleAddCryptoToFavorite(data);
  }

  @EventPattern('remove_crypto_from_favorite')
  handleRemoveCryptoFromFavorite(data: any) {
    return this.cryptoService.handleRemoveCryptoFromFavorite(data);
  }
}