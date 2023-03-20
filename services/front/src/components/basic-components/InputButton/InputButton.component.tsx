import classNames from 'classnames';

import { InputButtonProps } from '@components/InputButton/InputButton.interface';
import { Container as ButtonContainer, BasicButton, ButtonContent } from '@styles/Button.style';
import { BasicInput, Container, Placeholder } from '@styles/Input.style';
import { InputButtonContainer, InputWrapper, ButtonWrapper } from '@styles/InputButton.style';

export const InputButton = ({
  value,
  placeholder,
  type,
  onChange,
  onClick,
  buttonDisabled,
  buttonTitle,
  onError
}: InputButtonProps) => {
  return (
    <Container>
      <Placeholder>{placeholder}</Placeholder>
      <InputButtonContainer>
        <InputWrapper>
          <BasicInput
            className={classNames({ onError, high: true })}
            type={type}
            value={value}
            onChange={onChange}
          />
        </InputWrapper>

        <ButtonWrapper>
          <ButtonContainer
            onClick={onClick}
          >
            <BasicButton
              className={classNames({
                disabled: buttonDisabled,
                highHeight: true,
                fillButton: true
              })}
            >
              <ButtonContent>{buttonTitle}</ButtonContent>
            </BasicButton>
          </ButtonContainer>
        </ButtonWrapper>
      </InputButtonContainer>
    </Container>
  );
};
