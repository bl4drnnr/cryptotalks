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

  get mongoDbUrl() {
    return this.getString('MONGO_DB');
  }

  get basicAuthConfig() {
    return {
      username: this.getString('BASIC_AUTH_USERNAME'),
      password: this.getString('BASIC_AUTH_PASSWORD')
    };
  }

  get sendGridCredentials() {
    return {
      api_key: this.getString('SENDGRID_API_KEY'),
      sender_email: this.getString('SENDGRID_SENDER_EMAIL')
    };
  }

  get jwtAuthConfig() {
    return {
      accessExpiresIn: this.getString('JWT_ACCESS_EXPIRES_IN'),
      refreshExpiresIn: this.getString('JWT_REFRESH_EXPIRES_IN'),
      secret: this.getString('JWT_SECRET')
    };
  }

  get frontEndUrl() {
    return this.getString('FRONT_END_URL');
  }

  get coinrankingCredentials() {
    return {
      key: this.getString('X_RAPIDAPI_KEY'),
      host: this.getString('X_RAPIDAPI_HOST'),
      url: this.getString('X_RAPIDAPI_URL'),
      reference_currency_uuid: this.getString('X_RAPIDAPI_TIME_UUID'),
      time_period: this.getString('X_RAPIDAPI_TIME_PERIOD'),
      limit: this.getString('X_RAPIDAPI_LIMIT')
    };
  }
}
