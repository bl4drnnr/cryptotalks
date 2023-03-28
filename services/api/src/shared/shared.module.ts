import { Global, Module } from '@nestjs/common';
import { ApiConfigService } from '@shared/config.service';
import {ServiceClient} from "@shared/service-client.service";

const providers = [ApiConfigService, ServiceClient];

@Global()
@Module({
  providers,
  exports: [...providers]
})
export class SharedModule {}
