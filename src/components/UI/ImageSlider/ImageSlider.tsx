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
  const [slider, setSlider] = useState<SwiperCore>();

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
            <SwiperSlide>
              <img src={image.full} className={s.full} alt="" />
            </SwiperSlide>
          ))
        }
      </Swiper>

      <div className={s.scroll}>
        {
          images.map((image, i) => (
            <button className={s.small} onClick={() => slideTo(i)}>
              <img src={image.small} alt="" />
            </button>
          ))
        }
      </div>
    </>
  );
}