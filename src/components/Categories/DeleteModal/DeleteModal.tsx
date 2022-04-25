import React from 'react';

import { Modal } from '../../UI/Modal/Modal';
import { Typography } from '../../UI/Typography/Typography';

export type DeleteModalProps = {
  isOpen: boolean;
  onRemove: () => void;
  onClose: () => void;
}

export function DeleteCategoryModal({
  isOpen,
  onRemove,
  onClose,
}: DeleteModalProps) {
  const title = 'Удаление категории товара';
  const description = 'Вы действительно хотите удалить категорию?';

  return (
    <Modal
      isOpen={isOpen}
      title={title}
      body={<Typography variant="body1">{description}</Typography>}
      onAccept={onRemove}
      onClose={onClose}
    />
  );
}
