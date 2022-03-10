import React from 'react';
import s from './ProductInformation.module.scss';

export type ProductInformationProps = {
    starsCount: number;
    commentsCount: number;
    characteristics: Record<string, string>;
    onClickComments(): void;
};

export function ProductInformation(props: ProductInformationProps) {
  return <div>ProductInformation</div>;
}
