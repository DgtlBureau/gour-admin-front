import React from 'react';
import { SubmitHandler } from 'react-hook-form';

import {
  ProductFilterCheeseFormDto,
  ProductFilterMeatFormDto,
} from '../../../@types/dto/form/product-filters.dto';
import { ProductFilterFormCheese } from './Cheese';
import { ProductFilterFormMeat } from './Meat';

type Props = {
  type: 'cheese' | 'meat';
  onSubmit: SubmitHandler<ProductFilterMeatFormDto | ProductFilterCheeseFormDto>;
};

export function ProductFilterForm({ type, onSubmit }: Props) {
  return (
    <>
      {type === 'cheese' && <ProductFilterFormCheese onSubmit={onSubmit} />}
      {type === 'meat' && <ProductFilterFormMeat onSubmit={onSubmit} />}
    </>
  );
}
