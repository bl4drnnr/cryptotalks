import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 60px;
  background-color: rgb(${(props) => props.theme.colors.lightBackground});
  bottom: 0;
  margin-top: auto;
`;

export const Box = styled.div`
  width: 45%;
  height: 100%;
  border-top: 1px solid rgba(${(props) => props.theme.colors.textColor}, .25);
  margin: 0 auto;
  text-align: center;
  align-items: center;
  display: flex;

  @media only screen and (max-width: 780px) {
    width: 100%;
  }
`;

export const Text = styled.p`
  color: rgba(${(props) => props.theme.colors.textColor});
  font-family: "Charter", sans-serif;
  font-weight: 200;
  width: 100%;
`;
