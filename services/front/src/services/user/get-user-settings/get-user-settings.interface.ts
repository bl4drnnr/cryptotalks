export interface IPersonalInformation {
  id: string;
  firstName: string;
  lastName: string;
  twitter: string;
  linkedIn: string;
  personalWebsite: string;
  title: string;
  bio: string;
  username: string;
  createdAt: string;
}

export interface ISecuritySettings {
  emailChanged: boolean;
  passwordChanged: Date;
  email: string;
  publicEmail: boolean;
}

export interface GetUserSettingsPayload {
  token: string;
}

export interface GetUserSettingsResponse {
  personalSettings: IPersonalInformation;
  securitySettings: ISecuritySettings;
}
