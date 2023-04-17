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
  margin: 10px 0;

  &.vertical-margin {
    padding: 0;
    margin: 10px 0;
  }
`;

export const TooltipWrapper = styled.span`
  display: flex;
`;

export const TooltipImageWrapper = styled.span`
  filter: ${(props) => props.theme.colors.svgIconInvert};
  margin: 0 5px;
`;

export const Tooltip = styled.span`
  opacity: .9;

  &.activated[data-tool-tip] {
    position: relative;
    &::after {
      content: attr(data-tool-tip);
      border: 1px solid rgb(${(props) => props.theme.colors.success});
      color: rgb(${(props) => props.theme.colors.success});
      border-radius: 6px;
      padding: 3px;
      font-size: 12px;
    }
    &.activated--deactivated {
      &::after {
        border: 1px solid rgb(${(props) => props.theme.colors.error});
        color: rgb(${(props) => props.theme.colors.error});
      }
    }
  }
  
  &.pending[data-tool-tip] {
    margin: 0 10px;
    position: relative;
    &::after {
      content: attr(data-tool-tip);
      border: 1px solid rgb(${(props) => props.theme.colors.pending});
      color: rgb(${(props) => props.theme.colors.pending});
      border-radius: 6px;
      padding: 3px;
      font-size: 12px;
    }
  }

  &.tooltip[data-tool-tip] {
    position: relative;
    cursor: pointer;
    
    &::after {
      background: rgba(${(props) => props.theme.colors.darkBackground});
      font-size: 12px;
      font-weight: 100;
      content: attr(data-tool-tip);
      border: 1px solid rgba(${(props) => props.theme.colors.textColor}, .75);
      color: rgba(${(props) => props.theme.colors.textColor}, .5);
      display: block;
      position: absolute;
      padding: 4px;
      bottom: 130%;
      left: 0;
      white-space: nowrap;
      border-radius: 5px;
      transform: scale(0);
    }
    &:hover::after {
      transform: scale(1);
    }
  }
`;
