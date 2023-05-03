import styled from 'styled-components';

export const PostContainer = styled.div`
  padding: 15px;
  border: 1px solid rgba(${(props) => props.theme.colors.textColor}, .5);
  transition: .2s;
  cursor: pointer;
  border-radius: 8px;
  margin: 15px 0;

  &:hover {
    border: 1px solid rgba(${(props) => props.theme.colors.primary}, .5);
  }
`;

export const PostTitle = styled.h3`
  color: rgb(${(props) => props.theme.colors.textColor});
`;

export const PostTextPreview = styled.p`
  color: rgb(${(props) => props.theme.colors.textColor});
  margin: 15px 0;
`;

export const PostSearchTags = styled.div`
  display: flex;
`;

export const PostTag = styled.p`
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

export const PostCreatedAt = styled.p`
  color: rgb(${(props) => props.theme.colors.textColor}, .5);
  margin-top: 10px;

  &.positive {
    color: rgb(${(props) => props.theme.colors.success});
  }
  &.negative {
    color: rgb(${(props) => props.theme.colors.error});
  }
  &.neutral {
    color: rgba(${(props) => props.theme.colors.textColor});
  }
`;

export const EditButtonsWrapper = styled.div`
  display: flex;
  margin-top: 10px;
`;

export const EditButtonWrapper = styled.div`
  width: 100%;
  &.first {
    margin-right: 5px;
  }
  &.second {
    margin-left: 5px;
  }
`;

export const PostInfoItem = styled.div``;

export const PostInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
