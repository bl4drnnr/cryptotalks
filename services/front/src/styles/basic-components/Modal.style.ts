import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: fixed;
  display: flex;
  background: rgba(0, 0, 0, .5) 0 0 no-repeat padding-box;
  z-index: 998;
`;

export const Wrapper = styled.div`
  align-items: center;
  flex-direction: column;
  width: 500px;
  background: white 0 0 no-repeat padding-box;
  border-radius: 6px;
  display: flex;
  padding-bottom: 15px;

  @media screen and (max-width: 520px) {
    width: 90%;
    margin: 15px;
  }
`;

export const WindowHeader = styled.div`
  height: 80px;
  width: 100%;
  align-items: center;
  justify-content: center;
  position: relative;
  display: flex;
  color: black;
  
  img {
    position: absolute;
    left: 0;
    cursor: pointer;
  }

  h3 {
    position: absolute;
    color: black;
  }
`;

export const Description = styled.div`
  letter-spacing: 0;
  color: black;
  width: 85%;
  text-align: center;
  margin-bottom: 25px;
`;

export const ChildrenWrapper = styled.div`
  width: 90%;
`;

export const ModalTile = styled.h3``;
