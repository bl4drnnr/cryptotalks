export interface IPersonalInformation {
  firstName: string;
  lastName: string;
  twitter: string;
  linkedIn: string;
  personalWebsite: string;
  title: string;
  bio: string;
  username: string;
  publicEmail: boolean;
  createdAt: string;
  email: string;
}


export interface ISecuritySettings {
  emailChanged: boolean;
  lastPassChange: Date;
  twoFaType: string;
  email: string;
  phoneNumber: string;
}

interface ISettings {
  personalInformation: IPersonalInformation;
  securitySettings: ISecuritySettings;
}

export interface GetUserSettingsPayload {
  token: string;
}

export interface GetUserSettingsResponse {
  settings: ISettings;
}
