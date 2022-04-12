import React, { ReactElement } from 'react';

import { Card, CardContent, CardMedia } from '@mui/material';
import { Box } from '../UI/Box/Box';
import { Typography } from '../UI/Typography/Typography';

type Props = {
  image: string;
  title: string;
  searchQuery: string;
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

export function ProductSelectCard({
  image,
  title,
  isSelected,
  searchQuery,
  onSelect,
}: Props) {
  function getMarkStringByValue(value: string): ReactElement | string {
    const query: string = searchQuery.toLowerCase();
    const pos: number = value.toLowerCase().search(query);
    const { length } = query;

    if (pos === -1) return value;
    return (
      <>
        {value.slice(0, pos)}
        <mark>{value.slice(pos, pos + length)}</mark>
        {value.slice(pos + length)}
      </>
    );
  }

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
          {getMarkStringByValue(title)}
        </Typography>
      </CardContent>
    </Card>
  );
}
