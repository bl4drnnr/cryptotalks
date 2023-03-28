import { Global, Module } from '@nestjs/common';
import { ApiConfigService } from '@shared/config.service';
import { EmailService } from '@shared/email.service';

const providers = [ApiConfigService, EmailService];

@Global()
@Module({
  providers,
  exports: [...providers]
})
export class SharedModule {}
