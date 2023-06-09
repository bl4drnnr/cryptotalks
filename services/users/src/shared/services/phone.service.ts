import { Injectable } from '@nestjs/common';
import { TwilioService } from 'nestjs-twilio';
import { ApiConfigService } from '@shared/config.service';

@Injectable()
export class PhoneService {
  constructor(
    private readonly twilioService: TwilioService,
    private readonly configService: ApiConfigService
  ) {}

  async sendSmsCode({ targetPhoneNumber }: { targetPhoneNumber: string }) {
    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    await this.twilioService.client.messages.create({
      body: `Cryptotalks verification code: ${verificationCode}.\nWill be valid for 5 minutes.`,
      from: this.configService.twilioCredentials.twilio_auth_phone,
      to: targetPhoneNumber
    });

    return verificationCode;
  }
}
