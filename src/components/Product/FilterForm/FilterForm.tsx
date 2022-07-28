import React from 'react';

import {
  ProductFilterCheeseFormDto,
  ProductFilterMeatFormDto,
} from '../../../@types/dto/form/product-filters.dto';
import { ProductCategory } from '../../../@types/dto/product/category.dto';
import { ProductFilterFormCheese } from './Cheese';
import { FILTER } from './filterConstants';
import { ProductFilterFormMeat } from './Meat';

type Props = {
  type: ProductCategory;
  onChange: (
    data: ProductFilterMeatFormDto | ProductFilterCheeseFormDto,
    type: ProductCategory
  ) => void;
  cheeseDefaultValues?: ProductFilterCheeseFormDto;
  meatDefaultValues?: ProductFilterMeatFormDto;
};

export function ProductFilterForm({
  type,
  onChange,
  cheeseDefaultValues,
  meatDefaultValues,
}: Props) {
  return (
    <>
      {type === FILTER.CHEESE && (
        <ProductFilterFormCheese
          defaultValues={cheeseDefaultValues}
          onChange={onChange}
        />
      )}
      {type === FILTER.MEAT && (
        <ProductFilterFormMeat defaultValues={meatDefaultValues} onChange={onChange} />
      )}
    </>
  );
}
