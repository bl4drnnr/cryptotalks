import React from 'react';

interface ISecuritySettings {
  emailChanged: boolean;
  publicEmail: boolean;
  passwordChanged: Date;
  email: string;
}

export interface SecuritySettingsProps {
  securitySettings: ISecuritySettings | undefined;
  setSecuritySettings: React.Dispatch<React.SetStateAction<any>>;
  setInternalLoader: React.Dispatch<React.SetStateAction<any>>;
  applySecuritySettings: any;
}
