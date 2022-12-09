import React from 'react';

import { Modal } from 'components/UI/Modal/Modal';

type Props = {
  isOpen: boolean;
  productName: string;
  onDelete: () => void;
  onCancel: () => void;
};

export function ProductDeleteModal({ isOpen, productName, onDelete, onCancel }: Props) {
  return (
    <Modal
      isOpen={isOpen}
      title='Вы действительно хотите удалить товар?'
      description={`Товар: ${productName}`}
      acceptText='Да'
      closeText='Нет'
      onAccept={onDelete}
      onClose={onCancel}
    />
  );
}
