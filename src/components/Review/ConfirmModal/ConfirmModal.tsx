import React from 'react';

import { Modal } from '../../UI/Modal/Modal';
import { Typography } from '../../UI/Typography/Typography';

type Comment = {
  authorName: string;
  text: string;
  productName: string;
  date: string;
};

type ConfirmReviewModalProps = {
  comment: Comment;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

type ModalBodyProps = {
  text: string;
  productName: string;
  date: string;
};

function ModalBody({ text, productName, date }: ModalBodyProps) {
  return (
    <>
      <Typography>{text}</Typography>
      <Typography sx={{ margin: '10px 0' }}>{productName}</Typography>
      <Typography>{date}</Typography>
    </>
  );
}

export function ConfirmReviewModal({
  comment,
  isOpen,
  onConfirm,
  onCancel,
}: ConfirmReviewModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      title={comment.authorName}
      onAccept={onConfirm}
      onClose={onCancel}
    >
      <ModalBody {...comment} />
    </Modal>
  );
}
