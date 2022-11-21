import React, { ReactElement } from 'react';

import { Card, CardContent, CardMedia } from '@mui/material';

import { Box } from 'components/UI/Box/Box';
import { Typography } from 'components/UI/Typography/Typography';

type Props = {
  image: string;
  title: string;
  searchQuery: string;
  isSelected: boolean;
  onSelect: () => void;
};

const sx = {
  card: {
    width: '100%',
    cursor: 'pointer',
    border: '1px solid',
    borderColor: 'secondary.main',
    borderRadius: 0,
  },
  box: {
    padding: '4px 0',
    textAlign: 'center',
    transition: 'all .2s ease',
  },
  cardText: {
    userSelect: 'none',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
};

export function ProductSelectCard({ image, title, isSelected, searchQuery, onSelect }: Props) {
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
    <Card sx={sx.card} onClick={onSelect}>
      <CardMedia component='img' height='140' image={image} />
      <Box
        sx={{
          ...sx.box,
          backgroundColor: isSelected ? 'primary.main' : 'secondary.main',
        }}
      >
        <Typography sx={{ ...sx.cardText, color: isSelected ? 'common.white' : '' }} variant='body1'>
          {isSelected ? 'Товар выбран' : 'Выбрать товар'}
        </Typography>
      </Box>
      <CardContent>
        <Typography sx={sx.cardText} variant='body1'>
          {getMarkStringByValue(title)}
        </Typography>
      </CardContent>
    </Card>
  );
}
