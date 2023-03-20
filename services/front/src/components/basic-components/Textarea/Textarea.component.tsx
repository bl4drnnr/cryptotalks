import classNames from 'classnames';

import { TextareaProps } from '@components/Textarea/Textarea.interface';
import { Container, Placeholder, BasicTextarea, OnErrorMessage, InputDescription } from '@styles/Textarea.style';

export const Textarea = ({
   value,
   placeholder,
   onError,
   onChange,
   onErrorMessage,
   inputDescription
}: TextareaProps) => {
  return (
    <Container>
      <Placeholder>{placeholder}</Placeholder>
      <BasicTextarea
        className={classNames({ onError })}
        value={value}
        onChange={onChange}
      />
      {onError && onErrorMessage?.length && (<OnErrorMessage>{onErrorMessage}</OnErrorMessage>)}
      {inputDescription && (<InputDescription>{inputDescription}</InputDescription>)}
    </Container>
  );
};
