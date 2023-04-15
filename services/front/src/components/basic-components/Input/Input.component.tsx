import classNames from 'classnames';

import { InputProps } from '@components/Input/Input.interface';
import { BasicInput, Container, InputDescription, OnErrorMessage, Placeholder } from '@styles/Input.style';

export const Input = ({
  value,
  placeholder,
  onWhite,
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
      {(placeholder.length) > 0 && <Placeholder
        className={classNames({ onWhite })}
      >{placeholder}</Placeholder>}
      <BasicInput
        disabled={disabled}
        className={classNames({ onError, high, disabled, onWhite })}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={innerPlaceholder?.length ? innerPlaceholder : ''}
      />
      {onError && onErrorMessage?.length && (<OnErrorMessage>{onErrorMessage}</OnErrorMessage>)}
      {inputDescription && (
        <InputDescription className={classNames({ onWhite })}>{inputDescription}</InputDescription>
      )}
    </Container>
  );
};
