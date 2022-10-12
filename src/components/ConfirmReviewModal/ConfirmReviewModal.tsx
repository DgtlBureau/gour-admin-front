import { Dialog } from '@mui/material';
import React, { CSSProperties } from 'react';
import { Comment } from '../Review/Table/Table';

import { Box } from '../UI/Box/Box';
import { Button } from '../UI/Button/Button';
import { Typography } from '../UI/Typography/Typography';
import { sx } from './ConfirmReviewModal.styles';

type Props = {
  comment: Comment;
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
      <Box sx={sx.wrapper}>
        <Typography sx={{ margin: '0 0 10px 0' }} variant="body1">
          {comment.authorName}
        </Typography>
        <Typography variant="body1">{comment.text}</Typography>
        <Typography sx={{ margin: '10px 0 10px 0' }} variant="body1">
          {comment.productName}
        </Typography>
        <Typography variant="body1">{comment.date}</Typography>
        <Box sx={{ margin: '25px 0 0 0' }}>
          {comment.isConfirmed !== true && (
            <Button type="button" variant="contained" onClick={onConfirm}>
              принять
            </Button>
          )}
          {comment.isConfirmed !== false && (
            <Button
              sx={{ margin: '0 0 0 10px' }}
              type="button"
              variant="outlined"
              onClick={onReject}
            >
              отклонить
            </Button>
          )}
        </Box>
      </Box>
    </Dialog>
  );
}
