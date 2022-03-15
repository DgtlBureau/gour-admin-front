import React, { CSSProperties } from 'react';
import { Box } from '../UI/Box/Box';
import { Button } from '../UI/Button/Button';
import { Typography } from '../UI/Typography/Typography';

type Comment = {
  authorName: string;
  text: string;
  productName: string;
  date: string;
};

type Props = {
  comment: Comment;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmReviewModal({ comment, onConfirm, onCancel }: Props) {
  const wrapperBoxStyles: CSSProperties = {
    maxWidth: '690px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };
  return (
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
        <Button sx={{ margin: '0 0 0 10px' }} type="button" variant="outlined" onClick={onCancel}>
          отклонить
        </Button>
      </Box>
    </Box>
  );
}
