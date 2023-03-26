import { IPersonalInformation } from '@services/get-user-settings/get-user-settings.interface';

export interface RefreshTokenPayload {
  token: string | null;
}

export interface RefreshTokenResponse {
  _at: string;
  user: IPersonalInformation;
}
