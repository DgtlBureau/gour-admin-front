import React from 'react';
import { SubmitHandler } from 'react-hook-form';

import {
  ProductFilterCheeseFormDto,
  ProductFilterMeatFormDto,
} from '../../../@types/dto/form/product-filters.dto';
import { ProductCategory } from '../../../@types/dto/product/category.dto';
import { useGetAllCategoriesQuery } from '../../../api/categoryApi';
import { ProductFilterFormCheese } from './Cheese';
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
      {type === 'cheese' && (
        <ProductFilterFormCheese
          defaultValues={cheeseDefaultValues}
          onChange={onChange}
        />
      )}
      {type === 'meat' && (
        <ProductFilterFormMeat defaultValues={meatDefaultValues} onChange={onChange} />
      )}
    </>
  );
}
