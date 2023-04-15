import styled from 'styled-components';

export const SecurityTitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media only screen and (max-width: 780px) {
    display: block;
    text-align: center;
  }
`;

export const SecurityTitle = styled.h1`
  padding-bottom: 10px;
  color: rgb(${(props) => props.theme.colors.textColor});
`;

export const SeparationLine = styled.div`
  width: 100%;
  height: 1px;
  opacity: .5;
  background-color: rgb(${(props) => props.theme.colors.opposite});
  margin-top: 15px;
  &.margin-bottom {
    margin-bottom: 50px;
  }
`;

export const SecurityItemBlock = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-height: 100px;
  align-items: center;
  border-bottom: 1px solid rgba(${(props) => props.theme.colors.opposite}, .25);
  
  @media only screen and (max-width: 780px) {
    display: block;
  }
`;

export const ItemTitle = styled.h2`
  color: rgb(${(props) => props.theme.colors.textColor});
`;

export const ItemDescription = styled.p`
  color: rgb(${(props) => props.theme.colors.textColor});
  opacity: .5;
`;

export const SecurityItemWrapper = styled.div`
  &.button {
    width: 200px;
    
    @media only screen and (max-width: 780px) {
      width: 100%;
      margin: 15px 0;
    }
  }
`;

export const SecuritySectionDescription = styled.p`
  color: rgb(${(props) => props.theme.colors.textColor}, .75);
`;

export const ModalItemsWrapper = styled.div`
  text-align: center;
`;

export const ModalButtonWrapper = styled.div`
  padding: 0 13px;

  &.vertical-margin {
    padding: 0;
    margin: 10px 0;
  }
`;
