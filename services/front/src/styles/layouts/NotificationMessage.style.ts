import styled from 'styled-components';

export const Container = styled.div`
  margin-right: auto;
  margin-left: auto;
  top: 10%;
  right: 0;
  left: 0;
  position: fixed;
  text-align: center;
  z-index: 1000;
  max-width: 280px;
  border-radius: 8px;
  border: 1px solid rgb(${(props) => props.theme.colors.primary});
  background-color: rgb(${(props) => props.theme.colors.darkBackground});

  @keyframes fadeIn {
    0% {
      opacity:0;
    }
    20% {
      opacity:1;
    }
    80% {
      opacity:1;
    }
    100% {
      opacity:0;
    }
  }

  &.fadeInClass {
    animation: fadeIn ease 7.5s;
    opacity: 0;
  }

  &.onError {
    border: 1px solid rgb(${(props) => props.theme.colors.error});
  }
`;

export const Content = styled.p`
  font-size: 16px;
  font-weight: 300;
  margin: 10px 0;
  color: rgb(${(props) => props.theme.colors.textColor});
`;
