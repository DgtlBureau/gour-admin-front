import React, { CSSProperties } from 'react';
import { Box } from '../UI/Box/Box';
import { Button } from '../UI/Button/Button';
import { Typography } from '../UI/Typography/Typography';

type Props = {
  title: string;
  image: string;
  onMoreCLick(): void;
};

const wrapperBoxSx: CSSProperties = {
  width: '285px',
  height: '156px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  backgroundColor: '#EBEBEB;',
  borderRadius: '8px',
  overflow: 'hidden',
  backgroundImage: 'image',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  padding: '26px 18px 13px 18px',
};

export function PromotionCard({ title, image, onMoreCLick }: Props) {
  return (
    <Box sx={{ ...wrapperBoxSx, backgroundImage: image ? `url(${image})` : 'none' }}>
      <Typography variant="subtitle1">{title}</Typography>
      <Button size="small" onClick={onMoreCLick}>
        подробнее
      </Button>
    </Box>
  );
}
