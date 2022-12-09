import React from 'react';

import { Modal } from 'components/UI/Modal/Modal';
import { Typography } from 'components/UI/Typography/Typography';

export type DeleteModalProps = {
  isOpen: boolean;
  onRemove: () => void;
  onClose: () => void;
};

export function DeleteCategoryModal({ isOpen, onRemove, onClose }: DeleteModalProps) {
  const title = 'Удаление категории товара';
  const description = 'Вы действительно хотите удалить категорию?';

  return (
    <Modal isOpen={isOpen} title={title} onAccept={onRemove} onClose={onClose}>
      <Typography variant='body1'>{description}</Typography>
    </Modal>
  );
}
