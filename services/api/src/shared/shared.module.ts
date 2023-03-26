import { Global, Module } from '@nestjs/common';
import { ApiConfigService } from './services/config.service';

const providers = [ApiConfigService];

@Global()
@Module({
  providers,
  exports: [...providers]
})
export class SharedModule {}
