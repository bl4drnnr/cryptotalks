import { Global, Module } from '@nestjs/common';
import { SlugService } from '@shared/slug.service';

const providers = [SlugService];

@Global()
@Module({
  providers,
  exports: [...providers]
})
export class SharedModule {}
