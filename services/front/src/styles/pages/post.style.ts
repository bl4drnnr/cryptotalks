import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  width: 65%;
  margin: 0 auto 30px auto;
  padding-top: 150px;

  @media only screen and (max-width: 1000px) {
    width: 90%;
  }
`;

export const Paragraph = styled.p`
  color: rgb(${(props) => props.theme.colors.textColor});
  text-indent: 50px;
  font-size: 20px;
  padding: 10px 0;
`;

export const PostTitle = styled.h1`
  color: rgb(${(props) => props.theme.colors.textColor});
  font-weight: 700;
  font-size: 64px;
  
  &.subtitle {
    font-weight: 100;
    font-size: 32px;
  }
  
  &.link {
    color: rgb(${(props) => props.theme.colors.primary});
    cursor: pointer;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const PostInfoBlog = styled.div`
  display: flex;
  margin: 15px 0;
  align-items: center;
  font-family: 'Montserrat', sans-serif;

  &.space-between {
    justify-content: space-between;
  }
`;

export const PostRate = styled.h1`
  font-weight: 900;
  
  &.positive {
    color: rgb(${(props) => props.theme.colors.success});
  }
  &.negative {
    color: rgb(${(props) => props.theme.colors.error});
  }
  &.neutral {
    color: rgba(${(props) => props.theme.colors.textColor});
  }
  &.comment { 
    font-size: 18px;
    font-weight: 500;
  }
`;

export const Tag = styled.p`
  color: rgba(${(props) => props.theme.colors.textColor}, .5);
  padding: 3px 5px;
  margin: 0 3px;
  border: 1px solid rgba(${(props) => props.theme.colors.primary}, .5);
  background: rgba(${(props) => props.theme.colors.textColor}, .15);
  border-radius: 5px;

  &:first-child {
    margin: 0 3px 0 0;
  }
`;

export const OpacitySpan = styled.span`
  opacity: .5;
  padding: 0 3px;
  
  &:first-child {
    padding-left: 0;
  }
`;

export const LinkWrapper = styled.span`
  color: rgb(${(props) => props.theme.colors.primary});
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const PostButtonWrapper = styled.div`
  width: 50%;
  margin: 30px auto 0 auto;
`;

export const JoinDiscussionTextWrapper = styled.div`
  text-align: center;
`;

export const CommentContainer = styled.div`
  width: 60%;
  min-height: 100px;
  border-radius: 8px;
  border: 1px solid rgba(${(props) => props.theme.colors.primary}, .5);
  margin: 10px 0;

  @media only screen and (max-width: 1000px) {
    width: 100%;
  }
`;

export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

export const CommentPayload = styled.p`
  color: rgb(${(props) => props.theme.colors.textColor});
  
  &.body {
    padding: 0 10px
  }
`;

export const CommentOpacityPayload = styled.span`
  color: rgb(${(props) => props.theme.colors.textColor});
  opacity: .5;
`;

export const VoteButtonsWrapper = styled.div`
  display: flex;
  margin: 10px;
  align-items: center;

  &.space-between {
    justify-content: space-between;
    margin: 0
  }
  &.button-content {
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    font-size: 24px;
    font-weight: 900;
  }
`;

export const VoteButton = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  color: rgb(${(props) => props.theme.colors.textColor});
  cursor: pointer;
  transition: .2s;
  
  &.up {
    justify-content: center;
    display: flex;
    border: 1px solid rgba(${(props) => props.theme.colors.success});
    
    &.active {
      background: rgba(${(props) => props.theme.colors.success}, .5);
    }
    
    &:hover {
      background: rgba(${(props) => props.theme.colors.success}, .5);
    }
  }
  
  &.down {
    justify-content: center;
    display: flex;
    border: 1px solid rgba(${(props) => props.theme.colors.error});
    
    &.active {
      background: rgba(${(props) => props.theme.colors.error}, .5);
    }
    
    &:hover {
      background: rgba(${(props) => props.theme.colors.error}, .5);
    }
  }
  
  &:first-child {
    margin-right: 10px;
  }
`;

export const PostVoteButtonsWrapper = styled.div`
  width: 50%;
  height: 50px;
  display: flex;
  margin: 0 auto;
`;

export const PostVoteButton = styled.div`
  width: 100%;
  display: flex;
  margin: 10px;
  align-items: center;
  justify-content: center;
  color: rgb(${(props) => props.theme.colors.textColor});
  cursor: pointer;
  transition: .2s;
  border-radius: 6px;
  font-family: 'Montserrat', sans-serif;
  
  &.up {
    border: 1px solid rgba(${(props) => props.theme.colors.success});
    &.active {
      background: rgba(${(props) => props.theme.colors.success}, .5);
    }
    &:hover {
      background: rgba(${(props) => props.theme.colors.success}, .5);
    }
  }

  &.down {
    border: 1px solid rgba(${(props) => props.theme.colors.error});
    &.active {
      background: rgba(${(props) => props.theme.colors.error}, .5);
    }
    &:hover {
      background: rgba(${(props) => props.theme.colors.error}, .5);
    }
  }
`;
