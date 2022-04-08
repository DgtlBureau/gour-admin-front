import React from 'react';

import { Modal } from '../../UI/Modal/Modal';
import { Button } from '../../UI/Button/Button';
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

type ModalActionsProps = {
  onConfirm: () => void;
  onCancel: () => void;
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

function ModalActions({ onConfirm, onCancel }: ModalActionsProps) {
  return (
    <>
      <Button type="button" variant="contained" size="small" onClick={onConfirm}>
        принять
      </Button>
      <Button
        sx={{ marginLeft: '10px' }}
        type="button"
        variant="outlined"
        size="small"
        onClick={onCancel}
      >
        отклонить
      </Button>
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
      body={<ModalBody {...comment} />}
      actions={<ModalActions onConfirm={onConfirm} onCancel={onCancel} />}
      onClose={onCancel}
    />
  );
}
