import React, { ReactNode } from 'react';

import * as S from './Modal.styled';

interface ModalProps {
  title?: string;
  children?: ReactNode;
  modal: boolean;
  close: () => void;
}

const Modal = ({ children, title, modal, close }: ModalProps) => {
  return (
    <S.BlackBackground onClick={close} modal={modal}>
      <S.Container>
        {title && <S.Title>{title}</S.Title>}
        <S.ModalBody>{children}</S.ModalBody>
      </S.Container>
    </S.BlackBackground>
  );
};

export type ModalType = typeof Modal;

export default Modal;
