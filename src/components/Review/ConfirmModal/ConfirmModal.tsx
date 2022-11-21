import React from 'react';

import { Dialog } from '@mui/material';

import { Box } from 'components/UI/Box/Box';
import { Button } from 'components/UI/Button/Button';
import { IconButton } from 'components/UI/IconButton/IconButton';
import { Typography } from 'components/UI/Typography/Typography';

import CloseIcon from '@mui/icons-material/Close';

import { Comment } from '../Table/Table';
import { getReviewStatus } from '../review.helper';
import { sx } from './ConfirmModal.styles';

type Props = {
  comment: Comment;
  isOpen: boolean;
  onConfirm: () => void;
  onReject: () => void;
  onCancel: () => void;
};

export function ReviewConfirmModal({ comment, isOpen, onConfirm, onReject, onCancel }: Props) {
  const commentStatus = getReviewStatus(comment.isConfirmed);
  return (
    <Dialog open={isOpen} onClose={onCancel}>
      <Box sx={sx.modal}>
        <Box sx={sx.header}>
          <Typography variant='h5'>Принять отзыв?</Typography>

          <IconButton onClick={onCancel} component='symbol'>
            <CloseIcon />
          </IconButton>
        </Box>

        <Typography sx={{ margin: '0 0 10px 0' }} variant='body1'>
          {comment.authorName}
        </Typography>

        <Typography variant='body1'>{comment.text}</Typography>

        <Typography sx={{ margin: '10px 0 10px 0' }} variant='body1'>
          {comment.productName}
        </Typography>

        <Typography variant='body1'>{comment.date}</Typography>

        <Box sx={sx.buttons}>
          {commentStatus !== 'accept' && (
            <Button type='button' variant='contained' onClick={onConfirm}>
              принять
            </Button>
          )}
          {commentStatus !== 'reject' && (
            <Button type='button' variant='outlined' onClick={onReject}>
              отклонить
            </Button>
          )}
        </Box>
      </Box>
    </Dialog>
  );
}
