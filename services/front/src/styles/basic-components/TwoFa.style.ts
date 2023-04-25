import styled from 'styled-components';

export const InputTwoFa = styled.input`
  margin: 4px;
  height: 4rem;
  width: 4rem;
  box-sizing: border-box;
  line-height: 24px;
  transition: .3s;
  font-size: 32px;
  font-weight: 900;
  outline: none;
  border-radius: 6px;
  caret-color: transparent;
  border: 1px solid rgba(${(props) => props.theme.colors.primary}, .3);
  text-align: center;
  color: white;
  background-color: rgba(${(props) => props.theme.colors.inputBackground}, .85);

  &:focus {
    outline: none !important;
    border: 1px solid rgba(${(props) => props.theme.colors.primary}, 1);
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    display: none;
  }
  
  @media only screen and (max-width: 780px) {
    height: 3rem;
    width: 3rem;
  }
`;

export const Placeholder = styled.p`
  opacity: .9;
  font-size: 16px;
  margin: 15px 5px;
  font-weight: 200;
  color: rgb(${(props) => props.theme.colors.textColor});
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
`;

export const TwoFaWrapper = styled.div`
  &.justifyCenter {
    ${Container} {
      justify-content: center;
    }
  }

  &.onWhite {
    ${Placeholder} {
      color: black;
    }
    ${InputTwoFa} {
      background-color: rgba(${(props) => props.theme.colors.inputBackground}, .15);
      color: black;
    }
  }
`;
