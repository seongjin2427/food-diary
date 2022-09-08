import { useState } from 'react';
import Modal, { ModalType } from '../components/shared/Modal';

interface UseModalActionType {
  openModal: () => void;
  closeModal: () => void;
}

const useModal = (): [boolean, UseModalActionType, ModalType] => {
  const [modalState, setModalState] = useState<boolean>(false);

  const actions: UseModalActionType = {
    openModal: function () {
      setModalState(true);
    },
    closeModal: function () {
      setModalState(false);
    },
  };

  return [modalState, actions, Modal];
};

export default useModal;
