import React from 'react';

export interface InputProps {
  onWhite?: boolean;
  value: any;
  placeholder: string;
  inputDescription?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  onError?: boolean | undefined;
  onErrorMessage?: string;
  high?: boolean;
  innerPlaceholder?: string;
  disabled?: boolean;
}
