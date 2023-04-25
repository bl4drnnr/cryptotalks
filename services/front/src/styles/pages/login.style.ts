import styled from 'styled-components';

export const Box = styled.div`
  width: 500px;
  &.scrollable {
    @media only screen and (max-width: 780px) {
      padding-top: 100px;
      margin-bottom: 50px;
    }
   height: 100vh;
   overflow-y: auto;
   padding: 20px;
   -ms-overflow-style: none;
   scrollbar-width: none;
   &::-webkit-scrollbar {
    display: none;
   }
  }
`;

export const Link = styled.span`
  text-decoration: underline;
  display: inline;
  cursor: pointer;
  color: rgb(${(props) => props.theme.colors.primary});
`;

export const Tea = styled.span`
  font-size: 14px;
  opacity: .75;
`;

export const MarginWrapper = styled.div`
  margin: 15px 0;
  
  &.big {
    margin: 45px 0;
    justify-content: center;
  }

  @media only screen and (max-width: 780px) {
    margin: 15px;
  }
`;

export const MarginVerticalWrapper = styled.span`
  width: 100%;
  margin: 0 10px;
`;

export const PasswordCheckBox = styled.div`
  width: 100%;
  padding: 15px;
  
  &.no-padding {
    padding: 0;
  }
`;

export const PasswordCheckLine = styled.div`
  display: inline-grid;
  grid-template-columns: max-content max-content;
  align-items: center;
  padding: 5px;
  margin: 5px 0;
  font-weight: 100;
  color: rgb(${(props) => props.theme.colors.textColor});
  
  &.on-white {
    color: black;
  }
`;

export const Dot = styled.div`
  height: 16px;
  width: 16px;
  background-color: rgb(${(props) => props.theme.colors.success});
  border-radius: 50%;
  display: inline-block;
  margin-right: 10px;
  vertical-align: top;

  &.error {
    background-color: rgb(${(props) => props.theme.colors.error});
  }
`;

export const WelcomeTitle = styled.h1`
  text-align: center;
  color: rgb(${(props) => props.theme.colors.textColor});
`;

export const WelcomeText = styled.p`
  font-size: 20px;
  margin-top: 20px;
  color: rgb(${(props) => props.theme.colors.textColor});
`;

export const LoginOptions = styled.div`
  display: flex;
  margin: 20px 0;

  @media only screen and (max-width: 780px) {
    margin: 15px;
  }
`;

export const LoginOption = styled.p`
  cursor: pointer;
  transition: .2s;
  margin: 16px 0;
  color: rgb(${(props) => props.theme.colors.textColor});
  
  &:hover {
    color: rgb(${(props) => props.theme.colors.primary})
  }
`;

export const VerticalLine = styled.div`
  margin: 0 20px;
  width: 1px;
  background-color: rgb(${(props) => props.theme.colors.textColor});
  height: 50px;
  float: left;
  opacity: .5;
`;

export const Buttons = styled.div`
  display: flex;
  font-weight: 100;
`;

export const Title = styled.h1`
  color: rgb(${(props) => props.theme.colors.textColor});
  
  @media only screen and (max-width: 780px) {
    margin: 15px;
  }
`;

export const SubTitle = styled.h3`
  font-size: 24px;
  font-weight: 100;
`;

export const HeaderLink = styled.p`
  @media only screen and (max-width: 780px) {
    font-size: 12px;
  }
`;

export const HeaderSmall = styled.h3`
  color: rgb(${(props) => props.theme.colors.textColor});
`;

export const Paragraph = styled.p`
  color: rgb(${(props) => props.theme.colors.textColor});
`;
