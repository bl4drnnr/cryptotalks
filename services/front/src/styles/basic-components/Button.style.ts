import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
`;

export const ButtonContent = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  font-family: "Inter", sans-serif;
  color: rgb(${(props) => props.theme.colors.textColor});
  padding: 0 5px;
`;


export const BasicButton = styled.button`
  height: 36px;
  width: 100%;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid rgb(${(props) => props.theme.colors.primary}, .5);
  transition: .3s;
  background-color: rgba(${(props) => props.theme.colors.inputBackground}, .85);

  &.fillButton {
    background-color: rgb(${(props) => props.theme.colors.primary});
    color: black;
    ${ButtonContent} {
      color: black;
    }
    &:hover {
      background-color: rgb(${(props) => props.theme.colors.primary});
    }
  }

  &.highHeight {
    height: 48px;
  }

  &.disabled {
    background-color: rgba(${(props) => props.theme.colors.disableColor}, .20);
    cursor: auto;
    border: 1px solid rgba(${(props) => props.theme.colors.textColor}, .5);
  }

  &.danger {
    border: 1px solid rgb(${(props) => props.theme.colors.error}, .5);
    &:hover {
      border: 1px solid rgb(${(props) => props.theme.colors.error}, 1);
      background-color: rgba(${(props) => props.theme.colors.error}, .20);
    }
  }

  &.fillDanger {
    border: 1px solid rgb(${(props) => props.theme.colors.error});
    background-color: rgba(${(props) => props.theme.colors.error});
    &:hover {
      background-color: rgba(${(props) => props.theme.colors.error});
      border: 1px solid rgb(${(props) => props.theme.colors.error});
    }
  }

  &:hover {
    border: 1px solid rgb(${(props) => props.theme.colors.primary}, 1);
    background-color: rgba(${(props) => props.theme.colors.primary}, .20);
  }

  &.onWhite {
    background-color: rgba(${(props) => props.theme.colors.inputBackground}, .15);
    ${ButtonContent} {
      color: black;
    }
  }
`;
