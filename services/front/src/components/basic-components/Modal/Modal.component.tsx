import Image from 'next/image';

import { ModalProps } from '@components/Modal/Modal.interface';
import { ChildrenWrapper, Container, Description, ModalTile, WindowHeader, Wrapper } from '@styles/Modal.style';

export const Modal = ({ onClose, header, description, children }: ModalProps) => {
  return (
    <Container onClick={onClose}>
      <Wrapper onClick={(e) => e.stopPropagation()}>
        <WindowHeader>
          <Image
            src={`${process.env.NEXT_PUBLIC_PUBLIC_S3_BUCKET_URL}/backarrowmodal.svg`}
            alt={'close'}
            width={72}
            height={72}
            onClick={onClose}
          />
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
