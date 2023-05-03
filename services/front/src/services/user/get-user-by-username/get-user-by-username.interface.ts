import { IPersonalInformation } from '@services/get-user-settings/get-user-settings.interface';

export interface GetUserByUsernamePayload {
  username: string;
}

export interface GetUserByUsernameResponse {
  data: IPersonalInformation;
}
