import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  width: 65%;
  margin: 0 auto;
  padding-top: 150px;

  @media only screen and (max-width: 1000px) {
    width: 90%;
  }
  
  a {
    color: rgb(${(props) => props.theme.colors.primary});
    text-decoration: underline;
  }
`;

export const CoinWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const CoinTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CoinTitles = styled.div`
  width: 100%;
`;

export const CoinTitle = styled.h1`
  color: rgb(${(props) => props.theme.colors.textColor});
  font-size: 64px;
  margin-left: 40px;
`;

export const CoinSubtitle = styled.h3`
  color: rgb(${(props) => props.theme.colors.textColor});
  font-size: 48px;
  font-weight: 100;
  margin-left: 40px;
  
  &.subsubtitle {
    margin: 20px 0;
    font-size: 32px;
  }
`;

export const CoinParagraph = styled.p`
  color: rgb(${(props) => props.theme.colors.textColor});
`;

export const CoinLink = styled.span`
  color: rgb(${(props) => props.theme.colors.primary});
  text-decoration: underline;
  cursor: pointer;
`;

export const CoinMarketDataWrapper = styled.div`
  display: flex;
`;

export const CoinTable = styled.table`
  width: 100%;
  border: 1px solid rgb(${(props) => props.theme.colors.textColor}, .5);
  border-collapse: collapse;
`;

export const CoinTableBody = styled.tbody``;

export const CoinTableRow = styled.tr``;


export const CoinTableRec = styled.td`
  border: 1px solid rgb(${(props) => props.theme.colors.textColor}, .5);
  padding: 10px;
`;
