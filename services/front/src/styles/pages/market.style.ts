import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  width: 65%;
  margin: 0 auto;
  padding-top: 150px;

  @media only screen and (max-width: 1000px) {
    width: 90%;
  }
  
  table, th, td {
    border-collapse: collapse;
    border: 1px solid rgba(${(props) => props.theme.colors.opposite});
  }
`;

export const MarketStatsTable = styled.table`
  width: 100%;
`;

export const MarketStatsTitle = styled.h1`
  color: rgb(${(props) => props.theme.colors.textColor});
  margin-bottom: 20px;
`;

export const MarketStatsBody = styled.tbody``;

export const MarketStatsRow = styled.tr``;

export const MarketStatsHeader = styled.th`
  color: rgb(${(props) => props.theme.colors.textColor});
  padding: 10px;
`;

export const MarketStatsItem = styled.td`
  color: rgb(${(props) => props.theme.colors.textColor});
  text-align: center;
  padding: 10px;
`;

export const SearchInputWrapper = styled.div`
  width: 50%;
  text-align: center;
  margin: 0 auto 20px auto;

  @media only screen and (max-width: 1000px) {
    width: 100%;
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
    &:nth-child(2) {
      border-right: 1px solid rgb(${(props) => props.theme.colors.primary});
    }
    &:last-child {
      border-radius: 0 8px 8px 0;
      border-left: 1px solid rgb(${(props) => props.theme.colors.primary});
    }
  }
  
  &:nth-child(2) {
    border-right: none;
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

export const CryptoItem = styled.div`
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
  border-radius: 8px;
  transition: .2s;
  display: flex;
  justify-content: space-between;
  border: 1px solid rgb(${(props) => props.theme.colors.opposite}, .5);
  padding: 15px;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
    border: 1px solid rgb(${(props) => props.theme.colors.opposite});
  }
`;

export const CryptoItemSide = styled.div`
  display: flex;
  align-items: center;
  width: 300px;
  
  &.small-width {
    width: 100px;
  }
`;

export const CryptoNames = styled.div`
  padding-left: 20px;
`;

export const CryptoSymbol = styled.h1`
  font-size: 18px;
  color: rgb(${(props) => props.theme.colors.textColor});
`;

export const CryptoName = styled.p`
  color: rgba(${(props) => props.theme.colors.textColor}, .5);
`;

export const CryptoMetadata = styled.p`
  font-size: 14px;
  color: rgba(${(props) => props.theme.colors.textColor}, .5);
  
  &.success {
    color: rgba(${(props) => props.theme.colors.success}, .5);
  }
  &.error {
    color: rgba(${(props) => props.theme.colors.error}, .5);
  }
`;
