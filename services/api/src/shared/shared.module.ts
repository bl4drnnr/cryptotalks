import { Global, Module } from '@nestjs/common';
import { ApiConfigService } from '@shared/config.service';
import { ServiceClient } from '@shared/service-client.service';
import { HttpModule } from '@nestjs/axios';
import { ValidatorService } from '@shared/validator.service';

const providers = [ApiConfigService, ServiceClient, ValidatorService];

@Global()
@Module({
  providers,
  exports: [...providers],
  imports: [HttpModule]
})
export class SharedModule {}
