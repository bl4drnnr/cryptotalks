import React from 'react';

import { IPersonalInformation } from '@services/get-user-settings/get-user-settings.interface';

export interface PersonalInformationProps {
  personalInformation: IPersonalInformation | undefined;
  setPersonalInformation: React.Dispatch<React.SetStateAction<any>>;
  applyPersonalInformation: any;
  setSelectedFile: React.Dispatch<React.SetStateAction<any>>;
  isProfilePicturePresent: boolean;
}
