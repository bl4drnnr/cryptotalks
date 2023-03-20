import styled from 'styled-components';

export const LabelBox = styled.label`
  display: block;
  position: relative;
  max-width: 12px;
  padding-left: 35px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const Checkmark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: rgba(${(props) => props.theme.colors.disableColor}, .15);
  border-radius: 5px;
`;

export const Label = styled.div`
  padding-top: 4px;
  margin: 0;
  font-size: 12px;
  color: rgb(${(props) => props.theme.colors.textColor});
`;

export const Container = styled.div`
  display: flex;
  padding-top: 12px;
  padding-bottom: 20px;
  
  ${LabelBox} input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  
  ${LabelBox}:hover input ~ ${Checkmark} {
    background-color: #ccc;
  }

  ${LabelBox} input:checked ~ ${Checkmark} {
    background-color: rgb(${(props) => props.theme.colors.primary});
  }
  
  ${Checkmark}:after {
    content: "";
    position: absolute;
    display: none;
  }
  
  ${LabelBox} input:checked ~ ${Checkmark}:after {
    display: block;
  }
  
  ${LabelBox} ${Checkmark}:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid black;
    border-width: 0 3px 3px 0;
    --webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;
