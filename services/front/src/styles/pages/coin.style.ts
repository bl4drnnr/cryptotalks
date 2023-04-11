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

export const CoinWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const CoinTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CoinTitles = styled.div``;

export const CoinTitle = styled.h1`
  color: rgb(${(props) => props.theme.colors.textColor});
  font-size: 64px;
  margin-left: 40px;
`;

export const CoinSubtitle = styled.h3`
  color: rgb(${(props) => props.theme.colors.textColor});
  font-size: 48px;
  font-weight: 100;
  font-family: "Lato", sans-serif;
  margin-left: 40px;
  
  &.subsubtitle {
    margin: 20px 0;
    font-size: 32px;
  }
`;

export const CoinParagraph = styled.p`
  color: rgb(${(props) => props.theme.colors.textColor});
`;
