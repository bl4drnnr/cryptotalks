import React from 'react';

import Image from 'next/image';

import { ThemeTogglerProps } from '@components/ThemeToggler/ThemeToggler.interface';
import { Toggler } from '@styles/ThemeToggler.style';

export const ThemeToggler = ({ theme, onClick }: ThemeTogglerProps) => {
  return (
    <Toggler onClick={onClick}>
      {theme === 'dark' ? (
        <><Image src={'/img/sun.svg'} alt={'Sun'} width={30} height={30}/></>
      ) : (
        <><Image src={'/img/moon.svg'} alt={'Moon'} width={30} height={30}/></>
      )}
    </Toggler>
  );
};

