import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { isNil } from 'lodash';

@Injectable()
export class ApiConfigService {
  constructor(private readonly configService: ConfigService) {}

  private get(key: string): string {
    const value = this.configService.get<string>(key);

    if (isNil(value)) {
      throw new Error(key + ' environment variable does not set');
    }

    return value;
  }

  private getString(key: string): string {
    const value = this.get(key);

    return value.replace(/\\n/g, '\n');
  }

  get sendGridCredentials() {
    return {
      api_key: this.getString('SENDGRID_API_KEY'),
      sender_email: this.getString('SENDGRID_SENDER_EMAIL')
    };
  }

  get frontEndUrl() {
    return this.getString('FRONT_END_URL');
  }

  get twilioCredentials() {
    return {
      twilio_auth_phone: this.getString('TWILIO_AUTH_PHONE'),
      twilio_account_sid: this.getString('TWILIO_ACCOUNT_SID'),
      twilio_auth_token: this.getString('TWILIO_AUTH_TOKEN')
    };
  }
}
