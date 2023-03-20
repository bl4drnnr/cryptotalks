import { CheckboxProps } from '@components/Checkbox/Checkbox.interface';
import { Container, LabelBox, Checkmark, Label } from '@styles/Checkbox.style';

export const Checkbox = ({ label, onChange, value }: CheckboxProps) => {
  return (
    <Container>
      <LabelBox>
        <input type="checkbox" onChange={onChange} checked={value}/>
        <Checkmark></Checkmark>
      </LabelBox>
      <Label>{label}</Label>
    </Container>
  );
};
