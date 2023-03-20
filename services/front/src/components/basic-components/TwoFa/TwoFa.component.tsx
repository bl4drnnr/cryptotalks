import React from 'react';

import { TwoFaProps } from '@components/TwoFa/TwoFa.interface';
import { validate2fa } from '@hooks/useValidators.hook';
import { Container, InputTwoFa, Placeholder } from '@styles/TwoFa.style';

export const TwoFa = ({ title, setTwoFaCode }: TwoFaProps) => {
  const [n1, setN1] = React.useState('');
  const [n2, setN2] = React.useState('');
  const [n3, setN3] = React.useState('');
  const [n4, setN4] = React.useState('');
  const [n5, setN5] = React.useState('');
  const [n6, setN6] = React.useState('');

  const n1Ref = React.useRef<HTMLInputElement>(null);
  const n2Ref = React.useRef<HTMLInputElement>(null);
  const n3Ref = React.useRef<HTMLInputElement>(null);
  const n4Ref = React.useRef<HTMLInputElement>(null);
  const n5Ref = React.useRef<HTMLInputElement>(null);
  const n6Ref = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setN1(validate2fa(n1));
  }, [n1]);
  React.useEffect(() => {
    setN2(validate2fa(n2));
  }, [n2]);
  React.useEffect(() => {
    setN3(validate2fa(n3));
  }, [n3]);
  React.useEffect(() => {
    setN4(validate2fa(n4));
  }, [n4]);
  React.useEffect(() => {
    setN5(validate2fa(n5));
  }, [n5]);
  React.useEffect(() => {
    setN6(validate2fa(n6));
  }, [n6]);

  React.useEffect(() => {
    const code = [n1, n2, n3, n4, n5, n6].join('');
    setTwoFaCode(code);
  }, [n1, n2, n3, n4, n5, n6]);

  const clearTwoFa = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      setN1('');
      setN2('');
      setN3('');
      setN4('');
      setN5('');
      setN6('');
      (n1Ref.current as HTMLInputElement).focus();
    }
  };

  return (
    <div>
      <Placeholder>{title}</Placeholder>
      <Container>
        <InputTwoFa
          value={n1}
          onChange={(e) => setN1(e.target.value)}
          onInput={() => (n2Ref.current as HTMLInputElement).focus()}
          onKeyDown={(e) => clearTwoFa(e)}
          ref={n1Ref}
        />
        <InputTwoFa
          value={n2}
          onChange={(e) => setN2(e.target.value)}
          onInput={() => (n3Ref.current as HTMLInputElement).focus()}
          onKeyDown={(e) => clearTwoFa(e)}
          ref={n2Ref}
        />
        <InputTwoFa
          value={n3}
          onChange={(e) => setN3(e.target.value)}
          onInput={() => (n4Ref.current as HTMLInputElement).focus()}
          onKeyDown={(e) => clearTwoFa(e)}
          ref={n3Ref}
        />
        <InputTwoFa
          value={n4}
          onChange={(e) => setN4(e.target.value)}
          onInput={() => (n5Ref.current as HTMLInputElement).focus()}
          onKeyDown={(e) => clearTwoFa(e)}
          ref={n4Ref}
        />
        <InputTwoFa
          value={n5}
          onChange={(e) => setN5(e.target.value)}
          onInput={() => (n6Ref.current as HTMLInputElement).focus()}
          onKeyDown={(e) => clearTwoFa(e)}
          ref={n5Ref}
        />
        <InputTwoFa
          value={n6}
          onChange={(e) => setN6(e.target.value)}
          onKeyDown={(e) => clearTwoFa(e)}
          ref={n6Ref}
        />
      </Container>
    </div>
  );
};
