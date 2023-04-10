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
  
  &:first-child {
    border-radius: 8px 0 0 8px;
  }
  
  &:last-child {
    border-radius: 0 8px 8px 0;
  }
  
  &:hover {
    border: 1px solid rgba(${(props) => props.theme.colors.primary});
  }
`;

export const PaginationInfo = styled.span`
  color: rgb(${(props) => props.theme.colors.textColor});
  border: 1px solid rgb(${(props) => props.theme.colors.primary});
  padding: 10px;
`;
