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
    font-family: "Lato", sans-serif;
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
