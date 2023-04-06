import React from 'react';

interface ISecuritySettings {
  emailChanged: boolean;
  lastPassChange: Date;
  twoFaType: string;
  email: string;
  phoneNumber: string;
}

export interface SecuritySettingsProps {
  securitySettings: ISecuritySettings | undefined;
  setSecSettings: React.Dispatch<React.SetStateAction<any>>;
  applySecuritySettings: any;
}
