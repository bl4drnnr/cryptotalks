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

export const PostSearchInputWrapper = styled.div`
  width: 50%;
  text-align: center;
  margin: 0 auto 20px auto;

  @media only screen and (max-width: 1000px) {
    width: 100%;
  }
`;

export const SortWrapper = styled.div`
  display: flex;
  
  @media only screen and (max-width: 1000px) {
    display: block;
  }
`;

export const SortBar = styled.div`
  width: 100%;
  height: 35px;
  margin-bottom: 15px;
  display: flex;
`;

export const SortItem = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: 1px solid rgb(${(props) => props.theme.colors.primary}, .5);
  cursor: pointer;
  transition: .2s;
  color: rgb(${(props) => props.theme.colors.textColor});
  
  &.active {
    border: 1px solid rgb(${(props) => props.theme.colors.primary});
    &:first-child {
      border-radius: 8px 0 0 8px;
      border-right: 1px solid rgb(${(props) => props.theme.colors.primary});
    }
    &:last-child {
      border-radius: 0 8px 8px 0;
      border-left: 1px solid rgb(${(props) => props.theme.colors.primary});
    }
  }
  
  &:first-child {
    border-radius: 8px 0 0 8px;
    border-right: none;
  }
  
  &:last-child {
    border-radius: 0 8px 8px 0;
    border-left: none;
  }
  
  &:hover {
    border: 1px solid rgb(${(props) => props.theme.colors.primary});
  }
`;

export const TypeOfSortItem = styled.div`
  height: 35px;
  min-width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgb(${(props) => props.theme.colors.primary}, .5);
  border-radius: 8px;
  margin-left: 10px;
  cursor: pointer;
  transition: .2s;
  color: rgb(${(props) => props.theme.colors.textColor});
  font-family: 'Montserrat', sans-serif;
  
  &:hover {
    border: 1px solid rgb(${(props) => props.theme.colors.primary});
  }

  @media only screen and (max-width: 1000px) {
    margin: 10px 0;
  }
`;

export const PostIndexTitle = styled.h1`
  color: rgb(${(props) => props.theme.colors.textColor});
  margin-bottom: 20px;
  
  &.main {
    font-size: 64px;
    text-align: center;
  }
`;

export const PostIndexParagraph = styled.p`
  color: rgb(${(props) => props.theme.colors.textColor});
  margin: 10px 0;
`;
