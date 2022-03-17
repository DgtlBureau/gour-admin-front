import React, { CSSProperties, ReactNode, useState } from 'react';

import { Button, ButtonGroup, Grid } from '@mui/material';
// eslint-disable-next-line
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box } from '../UI/Box/Box';
import { Container } from '../UI/Container/Container';
import { Typography } from '../UI/Typography/Typography';

type Props = {
  title: string;
  cardsList: ReactNode[];
};

const wrapperBoxSx: CSSProperties = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export function CardSlider({ title, cardsList }: Props) {
  const [slider, setSlider] = useState<SwiperCore | null>(null);

  return (
    <Container sx={wrapperBoxSx}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item xs={6}>
          <Typography variant="h4">{title}</Typography>
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <ButtonGroup>
            <Button onClick={() => slider?.slidePrev()}>
              <ArrowBackIosIcon />
            </Button>
            <Button onClick={() => slider?.slideNext()}>
              <ArrowForwardIosIcon />
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
      <Box sx={{ width: '100%', margin: '40px 0 0 0' }}>
        <Swiper slidesPerView={4} onSwiper={setSlider}>
          {cardsList.map((card, i) => (
            <SwiperSlide key={card?.toLocaleString()}>{card}</SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Container>
  );
}
