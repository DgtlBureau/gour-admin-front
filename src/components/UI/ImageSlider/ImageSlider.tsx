/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import SwiperCore, { EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-fade';
import s from './ImageSlider.module.scss';

export type ImageSliderProps = {
  images: {
    small: string;
    full: string;
  }[];
};

export function ImageSlider({ images }: ImageSliderProps) {
  const [slider, setSlider] = useState<SwiperCore | null>(null);

  const slideTo = (i: number) => slider?.slideTo(i);

  return (
    <>
      <Swiper
        className={s.slider}
        modules={[EffectFade]}
        effect="fade"
        onSwiper={setSlider}
      >
        {
          images.map(image => (
            <SwiperSlide key={image.full}>
              <img src={image.full} className={s.full} alt="" />
            </SwiperSlide>
          ))
        }
      </Swiper>

      <div className={s.scroll}>
        {
          images.map((image, i) => (
            <div
              key={image.small}
              role="button"
              className={s.small}
              onClick={() => slideTo(i)}
              onKeyPress={undefined}
              tabIndex={0}
            >
              <img src={image.small} alt="" />
            </div>
          ))
        }
      </div>
    </>
  );
}
