import React from 'react';

import { Modal } from 'components/UI/Modal/Modal';

type Props = {
  isOpen: boolean;
  cityName: string;
  onDelete: () => void;
  onCancel: () => void;
};

export function DeleteCityModal({ isOpen, cityName, onDelete, onCancel }: Props) {
  return (
    <Modal
      isOpen={isOpen}
      title='Вы действительно хотите удалить город?'
      description={`Город: ${cityName}`}
      acceptText='Да'
      closeText='Нет'
      onAccept={onDelete}
      onClose={onCancel}
    />
  );
}
