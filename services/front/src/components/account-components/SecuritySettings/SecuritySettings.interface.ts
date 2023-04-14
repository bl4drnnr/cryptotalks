import React from 'react';

interface ISecuritySettings {
  emailChanged: boolean;
  passwordChanged: Date;
  email: string;
  publicEmail: boolean;
  phone: string | null;
  twoFaToken: boolean;
}

export interface SecuritySettingsProps {
  securitySettings: ISecuritySettings | undefined;
  setSecuritySettings: React.Dispatch<React.SetStateAction<any>>;
  setInternalLoader: React.Dispatch<React.SetStateAction<any>>;
  applySecuritySettings: any;
}
