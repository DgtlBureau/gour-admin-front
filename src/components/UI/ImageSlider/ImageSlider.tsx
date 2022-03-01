import React from 'react';
import s from './ImageSlider.module.scss';

export type ImageSliderProps = {
    images: {
        small: string;
        full: string;
    }[];
};

export function ImageSlider(props: ImageSliderProps) {
  return <div>ImageSlider</div>;
}
