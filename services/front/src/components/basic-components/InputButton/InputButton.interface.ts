import React from 'react';

export interface InputButtonProps {
  value: any;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  buttonTitle: string;
  onClick: () => void | never;
  type?: string;
  onError?: boolean;
  buttonDisabled?: boolean;
}
