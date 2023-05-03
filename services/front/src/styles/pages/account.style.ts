import styled from 'styled-components';

export const Container = styled.div`
  background-color: rgb(${(props) => props.theme.colors.darkBackground});
  padding-bottom: 30px;
`;

export const Wrapper = styled.div`
  height: 100%;
  width: 65%;
  margin: 0 auto;
  padding-top: 150px;

  @media only screen and (max-width: 1000px) {
    width: 90%;
  }
`;

export const AccountContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const UserInfoContainer = styled.div`
  width: 100%;
`;

export const UserProfilePicture = styled.div`
  display: flex;
  position: relative;
  border-bottom: 1px solid rgb(${(props) => props.theme.colors.opposite}, .5);
  margin-bottom: 30px;

  .ava {
    border-radius: 50%;
  }

  @media only screen and (max-width: 1000px) {
    display: block;
    border: none;
  }
`;

export const AccountInfoContainer = styled.div`
  padding: 0 30px;
  width: auto;
`;

export const AccountInfo = styled.div`
  display: flex;
  align-items: baseline;

  @media only screen and (max-width: 1000px) {
    display: block;
    text-align: center;
  }
`;

export const Nickname = styled.h1`
  color: rgb(${(props) => props.theme.colors.textColor});
`;

export const FullName = styled.p`
  opacity: .75;
  margin: 0 5px;
  color: rgb(${(props) => props.theme.colors.textColor});
`;

export const UserBio = styled.p`
  opacity: .5;
  color: rgb(${(props) => props.theme.colors.textColor});
  padding-top: 15px;
`;

export const AccountContentContainer = styled.div`
  display: flex;

  @media only screen and (max-width: 1000px) {
    display: block;
  }
`;

export const UserSideBar = styled.div`
  min-width: 255px;
  padding: 0 15px;
`;

export const UserContentSectionWrapper = styled.div``;

export const UserProfilePictureWrapper = styled.div`
  border-right: 1px solid rgb(${(props) => props.theme.colors.opposite}, .5);
  padding: 15px;

  @media only screen and (max-width: 1000px) {
    border: none;
    text-align: center;
  }
`;
export const CreatedAtParagraph = styled.p`
  color: rgba(${(props) => props.theme.colors.textColor});
  text-align: end;
`;

export const CreatedAtDate = styled.p`
  color: rgba(${(props) => props.theme.colors.textColor}, .5);
  text-align: end;
`;

export const AccountCreatedAtContainer = styled.div`
  min-width: 250px;
  padding: 15px 30px;

  @media only screen and (max-width: 1000px) {
    display: flex;
    ${CreatedAtDate} {
      margin: 0 5px;
    }
  }
`;


export const UserTitle = styled.p`
  color: rgba(${(props) => props.theme.colors.textColor}, .5);
  text-align: center;
  margin: 10px 0;
`;

export const ContactField = styled.div`
  display: flex;
  margin-top: 15px;
  cursor: pointer;
`;

export const ContactIcon = styled.div`
  margin: 0 5px;
  filter: ${(props) => props.theme.colors.svgIcon};
`;

export const ContactInformationWrapper = styled.div`
  display: block;
  max-width: 240px;
  margin-bottom: 10px;

  @media only screen and (max-width: 1000px) {
    width: 100%;
    max-width: none;
  }
`;

export const LatestPostsContainer = styled.div`
  padding: 0 15px;
`;

export const PostsTitle = styled.h1`
  color: rgb(${(props) => props.theme.colors.textColor});

  @media only screen and (max-width: 1000px) {
    margin: 15px 0;
    text-align: center;
  }
`;

export const NoPostsTitle = styled.h1`
  width: 100%;
  color: rgba(${(props) => props.theme.colors.textColor}, .5);
  text-align: center;
`;
