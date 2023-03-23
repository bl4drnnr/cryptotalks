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

  get jwtAuthConfig() {
    return {
      accessExpiresIn: this.getString('JWT_ACCESS_EXPIRES_IN'),
      refreshExpiresIn: this.getString('JWT_REFRESH_EXPIRES_IN'),
      secret: this.getString('JWT_SECRET')
    };
  }
}
