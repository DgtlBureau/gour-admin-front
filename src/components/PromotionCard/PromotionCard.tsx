import React, { CSSProperties } from 'react';
import { Box } from '../UI/Box/Box';
import { Button } from '../UI/Button/Button';
import { Typography } from '../UI/Typography/Typography';

type Props = {
  title: string;
  image: string;
  onClickMore(): void;
};

export function PromotionCard({ title, image, onClickMore }: Props) {
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

  return (
    <Box sx={wrapperBoxSx}>
      <Typography variant="subtitle1">{title}</Typography>
      <Button size="small" onClick={onClickMore}>подробнее</Button>
    </Box>
  );
}
