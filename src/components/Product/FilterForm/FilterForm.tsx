import React from 'react';
import { SubmitHandler } from 'react-hook-form';

import {
  ProductFilterCheeseFormDto,
  ProductFilterMeatFormDto,
} from '../../../@types/dto/form/product-filters.dto';
import { useGetAllCategoriesQuery } from '../../../api/categoryApi';
import { ProductFilterFormCheese } from './Cheese';
import { ProductFilterFormMeat } from './Meat';

type Props = {
  type: 'cheese' | 'meat';
  onChange: SubmitHandler<ProductFilterMeatFormDto | ProductFilterCheeseFormDto>;
};

export function ProductFilterForm({ type, onChange }: Props) {
  return (
    <>
      {type === 'cheese' && <ProductFilterFormCheese onSubmit={onChange} />}
      {type === 'meat' && <ProductFilterFormMeat onSubmit={onChange} />}
    </>
  );
}
