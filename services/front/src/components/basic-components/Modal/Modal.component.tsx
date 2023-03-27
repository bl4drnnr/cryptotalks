import Image from 'next/image';

import { ModalProps } from '@components/Modal/Modal.interface';
import { ChildrenWrapper, Container, Description, ModalTile, WindowHeader, Wrapper } from '@styles/Modal.style';
import Back from 'public/img/backarrowmodal.svg';

export const Modal = ({ onClose, header, description, children }: ModalProps) => {
  return (
    <Container onClick={onClose}>
      <Wrapper onClick={(e) => e.stopPropagation()}>
        <WindowHeader>
          <Image src={Back} alt={'close'} width={72} height={72} onClick={onClose}/>
          <ModalTile>{header}</ModalTile>
        </WindowHeader>
        <Description>{description}</Description>
        <ChildrenWrapper>
          {children}
        </ChildrenWrapper>
      </Wrapper>
    </Container>
  );
};
