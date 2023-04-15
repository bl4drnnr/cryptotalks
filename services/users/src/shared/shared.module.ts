import { Global, Module } from '@nestjs/common';
import { ApiConfigService } from '@shared/config.service';
import { EmailService } from '@shared/email.service';
import { PhoneService } from '@shared/phone.service';
import { TwilioModule } from 'nestjs-twilio';

const providers = [ApiConfigService, EmailService, PhoneService];

@Global()
@Module({
  providers,
  exports: [...providers],
  imports: [
    TwilioModule.forRootAsync({
      useFactory: (configService: ApiConfigService) => ({
        accountSid: configService.twilioCredentials.twilio_account_sid,
        authToken: configService.twilioCredentials.twilio_auth_token
      }),
      inject: [ApiConfigService]
    })
  ]
})
export class SharedModule {}
