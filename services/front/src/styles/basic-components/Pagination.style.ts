import styled from 'styled-components';

export const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  padding: 10px;
  border-radius: 8px;
`;

export const PaginationButton = styled.div`
  color: rgb(${(props) => props.theme.colors.textColor});
  border: 1px solid rgba(${(props) => props.theme.colors.primary}, .5);
  padding: 10px;
  cursor: pointer;
  transition: .2s;
  font-family: 'Montserrat', sans-serif;
  
  &:first-child {
    border-radius: 8px 0 0 8px;
  }
  
  &:last-child {
    border-radius: 0 8px 8px 0;
  }
  
  &:hover {
    border: 1px solid rgba(${(props) => props.theme.colors.primary});
  }
  
  &.disabled {
    color: rgba(${(props) => props.theme.colors.textColor}, .5);
    border: 1px solid rgba(${(props) => props.theme.colors.primary}, .25);
  }
`;

export const PaginationInfo = styled.span`
  color: rgb(${(props) => props.theme.colors.textColor});
  border: 1px solid rgb(${(props) => props.theme.colors.primary});
  padding: 10px;
`;

export const PageSizeInput = styled.input`
  background-color: rgba(${(props) => props.theme.colors.inputBackground}, .85);
  border: 1px solid rgba(${(props) => props.theme.colors.primary}, .3);
  border-radius: 5px;
  outline: none;
  padding: 0 16px 0 16px;
  max-width: 100px;
  box-sizing: border-box;
  font-size: 16px;
  line-height: 24px;
  transition: .3s;
  color: rgb(${(props) => props.theme.colors.textColor});
  font-weight: 100;


  &:focus {
    outline: none !important;
    border: 1px solid rgba(${(props) => props.theme.colors.primary}, 1);
  }
`;
