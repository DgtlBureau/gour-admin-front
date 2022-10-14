import React, { CSSProperties } from 'react';
import { Dialog } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { Box } from '../UI/Box/Box';
import { Button } from '../UI/Button/Button';
import { IconButton } from '../UI/IconButton/IconButton';
import { Typography } from '../UI/Typography/Typography';

import { sx } from './ConfirmReviewModal.style';

export type CommentModal = {
  id: number;
  authorName: string;
  text: string;
  productName: string;
  date: string;
};

type Props = {
  comment: CommentModal;
  isOpened: boolean;
  onConfirm: () => void;
  onReject: () => void;
  onCancel: () => void;
};

export function ConfirmReviewModal({
  comment,
  isOpened,
  onConfirm,
  onReject,
  onCancel,
}: Props) {
  return (
    <Dialog open={isOpened} onClose={onCancel}>
      <Box sx={sx.modal}>
        <Box sx={sx.header}>
          <Typography variant="h5">Принять отзыв?</Typography>
          <IconButton onClick={onCancel} component="symbol">
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography sx={{ margin: '0 0 10px 0' }} variant="body1">
          {comment.authorName}
        </Typography>
        <Typography variant="body1">{comment.text}</Typography>
        <Typography sx={{ margin: '10px 0 10px 0' }} variant="body1">
          {comment.productName}
        </Typography>
        <Typography variant="body1">{comment.date}</Typography>
        <Box sx={sx.buttons}>
          <Button type="button" variant="contained" onClick={onConfirm}>
            принять
          </Button>
          <Button type="button" variant="outlined" onClick={onReject}>
            отклонить
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
