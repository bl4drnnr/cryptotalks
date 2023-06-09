import styled from 'styled-components';

export const MainHomeWelcomeContainer = styled.div`
  height: 100vh;
  background-color: rgb(${(props) => props.theme.colors.darkBackground});
  border-bottom: 1px solid rgba(${(props) => props.theme.colors.textColor}, .25);
`;

export const HomeWelcomeBox = styled.div`
  z-index: 1;
  position: relative;
  text-align: center;
  align-items: center;
  justify-content: center;
  display: flex;
  height: 250px;
  @media only screen and (max-width: 780px) {
    height: 200px;
  }

  &.name {
    align-items: end;
  }

  &.block {
    display: block;
    animation: text-appearing 2s;
    @keyframes text-appearing {
      from {
        opacity: 0
      }
      to {
        opacity: 1
      }
    }
  }
`;

export const InputWrapper = styled.div`
  text-align: start;
  max-width: 500px;
  margin: 0 auto 30px auto;
  @media only screen and (max-width: 780px) {
    width: 70%;
    text-align: center;
  }
`;

export const HomeWelcomeTitle = styled.span`
  font-size: 72px;
  font-weight: 100;
  position: relative;
  display: block;
  animation: text-appearing 2s;
  color: rgb(${(props) => props.theme.colors.textColor});

  @keyframes lines {
    from {
      width: 0
    }
    to {
      width: 100vw
    }
  }

  @keyframes text-appearing {
    from {
      opacity: 0
    }
    to {
      opacity: 1
    }
  }

  &::before, &::after {
    content: '';
    position: absolute;
    display: block;
  }

  &::before {
    height: 100%;
    left: -20px;
    right: -20px;
    background: rgb(${(props) => props.theme.colors.darkBackground});
    z-index: -1;
  }

  &::after {
    animation: lines 2s;
    width: 100vw;
    height: 100%;
    top: 0;
    left: 50%;
    background: rgb(${(props) => props.theme.colors.textColor});
    transform: translateX(-50%);
    z-index: -2;
  }

  @media only screen and (max-width: 780px) {
    font-size: 40px;
  }
`;

export const BoldWeb3 = styled.span`
  cursor: pointer;
  font-weight: 600;
  color: rgb(${(props) => props.theme.colors.primary});
`;

export const Bold = styled.span`
  font-weight: 600;
`;

export const StartButton = styled.div`
  margin: 0 auto;
  height: 48px;
  width: 100%;
  background-color: rgb(${(props) => props.theme.colors.primary});
  color: black;
  border-radius: 8px;
  transition: .5s;
  cursor: pointer;
  display: flex;
  align-items: center;
  text-align: center;

  &:hover {
    transform: scale(1.1);
    -webkit-box-shadow: 0 0 149px 9px rgba(${(props) => props.theme.colors.primary}, .37);
    -moz-box-shadow: 0 0 149px 9px rgba(${(props) => props.theme.colors.primary}, .37);
    box-shadow: 0 0 149px 9px rgba(${(props) => props.theme.colors.primary}, .37);
  }

  &.aboutPage {
    margin-top: 50px
  }
`;

export const ButtonText = styled.h3`
  width: 100%;
  font-weight: 100;

  @media only screen and (max-width: 780px) {
    font-size: 14px;
  }
`;

export const Lines = styled.div``;

export const HomeLine = styled.div`
  position: absolute;
  width: 1px;
  height: 100vh;
  top: 0;
  left: 50%;
  background: rgba(${(props) => props.theme.colors.opposite}, .1);
  overflow: hidden;
  animation: appearing 2s;

  @keyframes appearing {
    0% {
      top: 100%;
    }
    100% {
      top: 0;
    }
  }

  @keyframes drop {
    0% {
      top: -50%;
    }
    100% {
      top: 110%;
    }
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    height: 15vh;
    width: 100%;
    top: -50%;
    left: 0;
    background: linear-gradient(to bottom, rgba(${(props) => props.theme.colors.opposite}, 0) 0%, rgb(${(props) => props.theme.colors.opposite}) 75%, rgb(${(props) => props.theme.colors.opposite}) 100%);
    animation: drop 4s 0s infinite;
    animation-fill-mode: forwards;
    animation-timing-function: cubic-bezier(0.4, 0.26, 0, 0.97);
  }

  &:nth-child(1) {
    margin-left: -20%;

    &::after {
      animation-delay: 1.6s;
    }
  }

  &:nth-child(2) {
    display: none;
  }

  &:nth-child(3) {
    margin-left: 20%;

    &::after {
      animation-delay: 2.4s;
    }
  }

  &:nth-child(4) {
    margin-left: 40%;

    &::after {
      animation-delay: 4s;
    }
  }

  &:nth-child(5) {
    margin-left: -40%;

    &::after {
      animation-delay: 0.2s;
    }
  }

  &:nth-child(6) {
    margin-left: -30%;

    &::after {
      animation-delay: 0.9s;
    }
  }

  &:nth-child(7) {
    margin-left: 30%;

    &::after {
      animation-delay: 2.2s;
    }
  }
`;

export const HomePostsContainer = styled.div`
  display: flex;
  
  &.align-center {
    padding: 20px 0;
    align-items: center;
    justify-content: center;
    @media only screen and (max-width: 1200px) {
      display: flex;
    }
  }

  @media only screen and (max-width: 1200px) {
    display: block;
  }
`;

export const HomePostsTitle = styled.h1`
  color: rgb(${(props) => props.theme.colors.textColor});
  font-size: 42px;
  font-weight: 100;
  
  &.subtitle {
    text-align: center;
    padding: 20px 0;
  }
`;

export const HomeParagraph = styled.p`
  color: rgb(${(props) => props.theme.colors.textColor});
  font-size: 22px;
  padding: 10px;
  font-weight: 100;
  text-align: center;
  
  &.small {
    font-size: 18px;
    padding: 20px;
  }
`;

export const HomeDescriptionSide = styled.div`
  width: 100%;

  &.image {
    @media only screen and (max-width: 1200px) {
      display: flex;
      justify-content: center;
    } 
  }
`;

export const SearchTagsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

export const SearchTagItem = styled.div`
  color: rgba(${(props) => props.theme.colors.textColor}, .5);
  padding: 3px 5px;
  margin: 0 3px;
  border: 1px solid rgba(${(props) => props.theme.colors.primary}, .5);
  background: rgba(${(props) => props.theme.colors.textColor}, .15);
  border-radius: 5px;
  font-family: 'Montserrat', sans-serif;
  
  &:first-child {
    margin-left: 0;
  }
`;

export const CoinInputWrapper = styled.div`
  margin: 0 20px 20px 20px;
`;
