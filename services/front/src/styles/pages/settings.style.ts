import styled from 'styled-components';

export const Container = styled.div`
  background-color: rgb(${(props) => props.theme.colors.darkBackground});
`;

export const Wrapper = styled.div`
  height: 100%;
  width: 70%;
  margin: 0 auto;
  padding-top: 75px;

  @media only screen and (max-width: 780px) {
    width: 90%;
  }
`;

export const SettingsPageHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 780px) {
    display: block;
  }
`;

export const SettingsPageHeaderSide = styled.div`
  display: flex;
  border-radius: 12px;
  padding: 12px;
  transition: .2s;
  cursor: pointer;
  
  &:hover {
    background: rgba(${(props) => props.theme.colors.opposite}, .1);
  }

  @media only screen and (max-width: 780px) {
    display: block;
  }
`;

export const SettingsHeaderTextWrapper = styled.div`
  @media only screen and (max-width: 780px) {
    text-align: center;
  }
`;

export const Nickname = styled.h1`
  color: rgb(${(props) => props.theme.colors.textColor});

  @media only screen and (max-width: 780px) {
    font-size: 20px;
  }
`;

export const PersonalAccount = styled.p`
  color: rgba(${(props) => props.theme.colors.textColor}, .5);
`;

export const SettingsHeaderItemsWrapper = styled.div`
  display: flex;
  padding: 0 15px;
  align-items: center;
  justify-content: center;

  &.created-at {
    position: relative;
  }
`;

export const UserProfilePicture = styled.div`
  display: flex;
  position: relative;
  cursor: pointer;
  
  .ava {
    border-radius: 50%;
  }

  @media only screen and (max-width: 780px) {
    justify-content: center;
  }
`;

export const SettingsContainer = styled.div`
  margin-top: 30px;
  width: 100%;
  display: flex;
  padding: 10px;

  @media only screen and (max-width: 780px) {
    display: block;
  }
`;

export const SidebarContainer = styled.div`
  width: 250px;
  @media only screen and (max-width: 780px) {
    width: 100%;
  }
`;

export const ButtonWrapper = styled.div`
  margin: 10px 0;
  &:first-child {
    margin-top: 0;
  }
`;

export const SettingsContent = styled.div`
  width: 100%;
  padding-left: 50px;

  @media only screen and (max-width: 780px) {
    padding: 0
  }
`;

export const CreatedAtParagraph = styled.p`
  color: rgba(${(props) => props.theme.colors.textColor});
  text-align: end;

  @media only screen and (max-width: 780px) {
    text-align: center;
  }
`;

export const CreatedAtDate = styled.p`
  color: rgba(${(props) => props.theme.colors.textColor}, .5);
  text-align: end;
  
  @media only screen and (max-width: 780px) {
    text-align: center;
  }
`;
