import styled from 'styled-components';

export const PopularCryptoContainer = styled.div``;

export const PopularCryptoWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100px;
  height: 80px;
  
  &.small-text {
    font-size: 15px;
  }
`;

export const PopularCryptoItem = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid rgba(${(props) => props.theme.colors.textColor}, .5);
  margin: 20px 0;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
  transition: .2s;
  
  &:hover {
    border: 1px solid rgba(${(props) => props.theme.colors.primary}, 1);
  }

  &.block {
    display: block;
  }
`;

export const PopularCryptoParagraph = styled.p`
  color: rgb(${(props) => props.theme.colors.textColor});
  
  &.small {
    opacity: .5;
  }
`;

export const RemoveCoinButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;
