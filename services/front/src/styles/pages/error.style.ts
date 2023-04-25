import styled from 'styled-components';

export const Container = styled.div`
  width: 50%;
  height: 600px;
  padding: 150px;
  &.center {
    text-align: center;
  }
`;

export const Title = styled.div`
  font-size: 48px;
  font-weight: 900;
`;

export const Content = styled.h3`
  font-size: 32px;
  font-weight: 100;
  margin: 15px 0;
`;

export const Link = styled.h3`
  text-decoration: underline;
  display: inline;
  cursor: pointer;
  color: rgb(${(props) => props.theme.colors.primary});
`;
