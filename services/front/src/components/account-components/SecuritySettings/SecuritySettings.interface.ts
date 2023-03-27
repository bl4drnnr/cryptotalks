interface ISecuritySettings {
  emailChanged: boolean;
  lastPassChange: Date;
  twoFaType: string;
  email: string;
  phoneNumber: string;
}

export interface SecuritySettingsProps {
  securitySettings: ISecuritySettings | undefined;
}
