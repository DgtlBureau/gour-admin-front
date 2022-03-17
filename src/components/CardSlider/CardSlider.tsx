import React, { ReactNode } from 'react';

import { Box } from '../UI/Box/Box';

type Props = {
  cardsList: ReactNode[];
};

export function CardSlider({ cardsList }: Props) {
  return <Box>{cardsList.map(card => card)}</Box>;
}
