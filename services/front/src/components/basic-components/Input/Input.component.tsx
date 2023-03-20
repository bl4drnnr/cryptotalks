import classNames from 'classnames';

import { InputProps } from '@components/Input/Input.interface';
import { BasicInput, Container, InputDescription, OnErrorMessage, Placeholder } from '@styles/Input.style';

export const Input = ({
  value,
  placeholder,
  type,
  onChange,
  onError,
  high,
  innerPlaceholder,
  onErrorMessage,
  inputDescription,
  disabled
}: InputProps) => {
  return (
    <Container>
      {(placeholder.length) > 0 && <Placeholder>{placeholder}</Placeholder>}
      <BasicInput
        disabled={disabled}
        className={classNames({ onError, high, disabled })}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={innerPlaceholder?.length ? innerPlaceholder : ''}
      />
      {onError && onErrorMessage?.length && (<OnErrorMessage>{onErrorMessage}</OnErrorMessage>)}
      {inputDescription && (<InputDescription>{inputDescription}</InputDescription>)}
    </Container>
  );
};
