import { Dialog } from '@mui/material';
import React, { CSSProperties } from 'react';
import { Box } from '../UI/Box/Box';
import { Button } from '../UI/Button/Button';
import { Typography } from '../UI/Typography/Typography';

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

const wrapperBoxStyles: CSSProperties = {
  maxWidth: '690px',
  padding: '25px',
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
      <Box sx={wrapperBoxStyles}>
        <Typography sx={{ margin: '0 0 10px 0' }} variant="body1">
          {comment.authorName}
        </Typography>
        <Typography variant="body1">{comment.text}</Typography>
        <Typography sx={{ margin: '10px 0 10px 0' }} variant="body1">
          {comment.productName}
        </Typography>
        <Typography variant="body1">{comment.date}</Typography>
        <Box sx={{ margin: '25px 0 0 0' }}>
          <Button type="button" variant="contained" onClick={onConfirm}>
            принять
          </Button>
          <Button
            sx={{ margin: '0 0 0 10px' }}
            type="button"
            variant="outlined"
            onClick={onReject}
          >
            отклонить
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
