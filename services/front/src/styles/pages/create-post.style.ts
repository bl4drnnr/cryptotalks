import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  width: 65%;
  margin: 0 auto;
  padding-top: 150px;

  @media only screen and (max-width: 1000px) {
    width: 90%;
  }
`;

export const CreatePostTitle = styled.h1`
  text-align: center;
  color: rgb(${(props) => props.theme.colors.textColor});
  font-size: 64px;
  
  &.subtitle {
    font-size: 32px;
    font-weight: 100;
    font-family: "Lato", sans-serif;
    text-align: start;
    margin-top: 20px;
    
    &.center {
      text-align: center;
    }
  }
`;

export const ButtonWrapper = styled.div`
  width: 30%;
  margin: 30px auto 0 auto;
`;
