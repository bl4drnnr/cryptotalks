export interface ButtonProps {
  text: string;
  small?: boolean;
  onClick?: () => void | never;
  disabled?: boolean;
  highHeight?: boolean;
  fillButton?: boolean;
  danger?: boolean;
  fillDanger?: boolean;
  onWhite?: boolean;
}
