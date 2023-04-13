import React from 'react';

import Image from 'next/image';

import { ThemeTogglerProps } from '@components/ThemeToggler/ThemeToggler.interface';
import { Toggler } from '@styles/ThemeToggler.style';

export const ThemeToggler = ({ theme, onClick }: ThemeTogglerProps) => {
  return (
    <Toggler onClick={onClick}>
      {theme === 'dark' ? (
        <><Image
          src={`${process.env.PUBLIC_S3_BUCKET_URL}/sun.svg`}
          alt={'Sun'}
          width={30}
          height={30}
        /></>
      ) : (
        <><Image
          src={`${process.env.PUBLIC_S3_BUCKET_URL}/moon.svg`}
          alt={'Moon'}
          width={30}
          height={30}
        /></>
      )}
    </Toggler>
  );
};

