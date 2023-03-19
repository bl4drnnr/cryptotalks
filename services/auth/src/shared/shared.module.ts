import { Global, Module } from '@nestjs/common';
import { ApiConfigService } from '@shared/config.service';
import { ValidatorService } from '@shared/validator.service';

const providers = [ApiConfigService, ValidatorService];

@Global()
@Module({
  providers,
  exports: [...providers]
})
export class SharedModule {}
