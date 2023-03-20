import React from 'react';

export interface InputProps {
  value: any;
  placeholder: string;
  inputDescription?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  onError?: boolean;
  onErrorMessage?: string;
  high?: boolean;
  innerPlaceholder?: string;
  disabled?: boolean;
}
