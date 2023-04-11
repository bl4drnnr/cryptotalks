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

  get coinGeckoUrl() {
    return this.getString('COINGECKO_API_URL');
  }
}
