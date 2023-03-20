import styled from 'styled-components';

export const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  padding-top: 120px;
`;

export const TacBox = styled.div`
  padding: 20px 0;
`;

export const Title = styled.h1`
  color: rgb(${(props) => props.theme.colors.textColor});
`;

export const Content = styled.p`
  color: rgb(${(props) => props.theme.colors.textColor});
`;
