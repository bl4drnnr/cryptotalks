import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  min-height: 100vh;
  background-color: rgb(${(props) => props.theme.colors.darkBackground});
`;

export const ContentWrapper = styled.div`
  padding-bottom: 60px;
`;

