import React from 'react';

export interface ModalProps {
  onClose: () => void | never;
  header: string;
  description: string;
  children: React.ReactElement | React.ReactElement[];
}
