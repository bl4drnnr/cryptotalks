import styled from 'styled-components';

export const MainWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: rgb(${(props) => props.theme.colors.lightBackground});
  
  .inline-link {
    &.en {
      font-family: 'Charter', sans-serif;
    }
    &.non-en {
      font-family: 'Crimson', serif;
    }
    color: rgb(${(props) => props.theme.colors.primaryDark});
    text-decoration: underline;
    :hover {
      cursor: pointer;
    }
  }
`;

export const MainBox = styled.div`
  margin-top: 65px;
`;
