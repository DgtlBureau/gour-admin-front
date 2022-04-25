import React from 'react';
import s from './ReferralCodeDiscountBlock.module.scss';

export type ReferralCodeDiscountBlockProps = {
    discount: number;
    onChange(discount: number): void;
};

export function ReferralCodeDiscountBlock(props: ReferralCodeDiscountBlockProps) {
  return <div>ReferralCodeDiscountBlock</div>;
}
