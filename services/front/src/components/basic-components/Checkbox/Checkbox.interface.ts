import React from 'react';

export interface CheckboxProps {
  value: any;
  label: JSX.Element | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
