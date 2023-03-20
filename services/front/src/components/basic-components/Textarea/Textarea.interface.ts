import React from 'react';

export interface TextareaProps {
  value: any;
  placeholder: string;
  onError?: boolean;
  onErrorMessage?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  inputDescription?: string;
}
