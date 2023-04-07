import React from 'react';

export interface TwoFaProps {
  title: string;
  setTwoFaCode: React.Dispatch<React.SetStateAction<string>>;
  styles?: any;
}
