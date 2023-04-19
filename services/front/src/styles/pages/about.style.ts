import styled from 'styled-components';

export const Container = styled.div`
  padding-top: 160px;
  width: 100%;
  background: rgb(${(props) => props.theme.colors.darkBackground});
  padding-bottom: 160px;
`;

export const Box = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 1300px) {
    display: block;
    text-align: center;
  }
`;

export const Wrapper = styled.div``;

export const Headers = styled.h1`
  font-size: 72px;
  font-weight: 100;
  font-family: "Lato", sans-serif;
  @media only screen and (max-width: 1300px) {
    font-size: 40px;
  }
`;

export const Header = styled.span`
  font-size: 144px;
  font-weight: 700;
  font-family: "Lato", sans-serif;
  animation: text-appearing 2s;
  animation-delay: 4s;
  animation-fill-mode: forwards;
  opacity: 0;
  color: rgb(${(props) => props.theme.colors.primary});

  @media only screen and (max-width: 1300px) {
    font-size: 64px;
  }

  @keyframes text-appearing {
    from {
      transform: scale(0.5);
      opacity: 0;
      filter: blur(1.5rem);
    }
    to {
      transform: scale(1);
      opacity: 1;
      filter: blur(0);
    }
  }
`;

export const Web3 = styled.h1`
  font-size: 144px;
  font-weight: 700;
  font-family: "Lato", sans-serif;
  @media only screen and (max-width: 1300px) {
    font-size: 64px;
  }
`;

export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-left: 120px;
  padding-right: 120px;
  
  &.end {
    padding: 100px;
  }

  &.light {
    background: rgb(${(props) => props.theme.colors.lightBackground});
  }

  @media only screen and (max-width: 1300px) {
    display: block;
    padding: 20px;
    text-align: center;
  }
`;

export const TextContainer = styled.div`
  padding-top: 100px;
  padding-left: 100px;

  &.end {
    padding-left: 0;
    padding-right: 50px;
    text-align: end;

    @media only screen and (max-width: 1300px) {
      text-align: center;
      padding: 0;
    }
  }

  &.center {
    padding-top: 0;
    width: 100%;
    text-align: center;
  }

  @media only screen and (max-width: 1300px) {
    padding: 0;
  }
`;

export const TextContainerTitle = styled.h1`
  font-size: 58px;
  @media only screen and (max-width: 1300px) {
    font-size: 32px;
  }
`;

export const TextContainerSubtitle = styled.h3`
  font-size: 42px;
  opacity: .75;
  font-weight: 100;
  font-family: "Lato", sans-serif;
  @media only screen and (max-width: 1300px) {
    font-size: 28px;
    margin-bottom: 20px;
  }
`;

export const TextContainerContent = styled.p`
  padding: 30px 100px 0 0;
  max-width: 850px;
  font-weight: 300;
  font-size: 22px;

  @media only screen and (max-width: 1300px) {
    padding: 0;
    font-size: 20px;
    margin: 0 auto;
  }

  &.end {
    padding: 30px 0 0 100px;

    @media only screen and (max-width: 1300px) {
      padding: 0;
      font-size: 20px;
      margin: 0 auto;
    }
  }
`;
