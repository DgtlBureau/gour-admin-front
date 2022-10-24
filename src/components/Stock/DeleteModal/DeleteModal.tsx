import React from 'react';

import { Modal } from 'components/UI/Modal/Modal';

export type DeleteModalProps = {
  isOpen: boolean;
  onDelete: () => void;
  onClose: () => void;
};

export function DeleteModal({ isOpen, onDelete, onClose }: DeleteModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      title='Удаление акции'
      description='Вы действительно хотите удалить акцию?'
      onAccept={onDelete}
      acceptText='Да'
      closeText='Нет'
      onClose={onClose}
    />
  );
}
