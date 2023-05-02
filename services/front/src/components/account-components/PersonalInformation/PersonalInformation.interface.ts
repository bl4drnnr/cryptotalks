import React from 'react';

interface IPersonalInformation {
  firstName: string;
  lastName: string;
  twitter: string;
  linkedIn: string;
  personalWebsite: string;
  title: string;
  bio: string;
  username: string;
}

export interface PersonalInformationProps {
  personalInformation: IPersonalInformation | undefined;
  setPersonalInformation: React.Dispatch<React.SetStateAction<any>>;
  applyPersonalInformation: any;
  setSelectedFile: React.Dispatch<React.SetStateAction<any>>;
}
