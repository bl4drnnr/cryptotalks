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
    text-align: start;
    margin-top: 20px;
    
    &.center {
      text-align: center;
    }
  }
`;

export const InputKeyWrapper = styled.div``;

export const ButtonWrapper = styled.div`
  width: 30%;
  margin: 30px auto 0 auto;
`;

export const SearchTagsWrapper = styled.div`
  display: flex;
  margin-top: 20px;
`;

export const SearchTagItem = styled.div`
  color: rgba(${(props) => props.theme.colors.textColor}, .5);
  padding: 3px 5px;
  margin: 0 3px;
  border: 1px solid rgba(${(props) => props.theme.colors.primary}, .5);
  background: rgba(${(props) => props.theme.colors.textColor}, .15);
  border-radius: 5px;
  transition: .2s;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;

  &:first-child {
    margin: 0 3px 0 0;
  }
  
  &:hover {
    color: rgb(${(props) => props.theme.colors.textColor});
    border: 1px solid rgb(${(props) => props.theme.colors.primary});
  }
`;
