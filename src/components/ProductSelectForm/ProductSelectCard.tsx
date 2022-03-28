import { Card, CardActions, CardContent, CardMedia } from '@mui/material';
import React from 'react';
import { Box } from '../UI/Box/Box';
import { Button } from '../UI/Button/Button';
import { Typography } from '../UI/Typography/Typography';

type Props = {
  image: string;
  title: string;
  isSelected: boolean;
  onSelect: () => void;
};

const sx = {
  box: {
    padding: '4px 0',
    textAlign: 'center',
    transition: 'all .2s ease',
  },
  cardText: {
    userSelect: 'none',
  },
};

export function ProductSelectCard({ image, title, isSelected, onSelect }: Props) {
  return (
    <Card sx={{ width: '100%', cursor: 'pointer' }} onClick={onSelect}>
      <CardMedia component="img" alt="green iguana" height="140" image={image} />
      <Box
        sx={{
          ...sx.box,
          backgroundColor: isSelected ? '#25262D' : '#D6D6D6',
        }}
      >
        <Typography
          sx={{ ...sx.cardText, color: isSelected ? '#fff' : '#25262d' }}
          variant="body1"
        >
          {isSelected ? 'Товар выбран' : 'Выбрать товар'}
        </Typography>
      </Box>
      <CardContent>
        <Typography sx={sx.cardText} variant="body1">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
}
