import React, { Dispatch, SetStateAction, useCallback, useMemo } from 'react';

import { Box } from 'components/UI/Box/Box';
import { TabPanel } from 'components/UI/Tabs/TabPanel';
import { Tabs } from 'components/UI/Tabs/Tabs';

import { ProductBasicSettingsFormDto } from 'types/dto/form/product-basic-settings.dto';
import { TopLevelCategory } from 'types/entities/Category';
import { Product } from 'types/entities/Product';

import { ProductBasicSettingsForm } from '../BasicSettingsForm/BasicSettingsForm';
import { ProductFilterForm } from '../FilterForm/FilterForm';
import { ProductSelectForm } from '../SelectForm/SelectForm';
import type { Product as SelectProduct } from '../SelectForm/types';
import { createProductTabOptions } from './fullFormConstants';

export type FullFormType = {
  basicSettings: ProductBasicSettingsFormDto;
  categoriesIds: Record<string, number>;
  productType?: number;
  productSelect?: number[];
};

type ProductFullFormProps = {
  activeTabId: string;
  onChangeTab: (tabId: string) => void;
  isProductsLoading?: boolean;
  categories: TopLevelCategory[];
  products: Product[];
  fullFormState: FullFormType;
  setFullFormState: Dispatch<SetStateAction<FullFormType>>;
};

export function ProductFullForm({
  activeTabId,
  categories,
  products,
  fullFormState,
  isProductsLoading,
  setFullFormState,
  onChangeTab,
}: ProductFullFormProps) {
  const handleChangeBasicSettingsForm = (data: ProductBasicSettingsFormDto) => {
    setFullFormState(prevState => {
      if (prevState.basicSettings.productType !== data.productType) {
        return {
          ...prevState,
          basicSettings: data,
          cheeseCategories: undefined,
          meatCategories: undefined,
        };
      }
      return { ...prevState, basicSettings: data };
    });
  };

  const onChangeRecommended = (recommendedIds: number[]) => {
    setFullFormState(prevState => ({ ...prevState, productSelect: recommendedIds }));
  };

  const onFilterFormChange = useCallback((selectedCategories: Record<string, number>) => {
    setFullFormState(prevState => ({
      ...prevState,
      categoriesIds: selectedCategories,
    }));
  }, []);

  const recommendedProducts: SelectProduct[] = useMemo(
    () =>
      products?.map(product => ({
        id: product.id,
        title: product.title.ru,
        image: product.images[0]?.small || '',
        categories: product.categories,
      })) || [],
    [products],
  );
  const productTypeOptions = useMemo(
    () =>
      categories.map(category => ({
        value: category.id,
        label: category.title.ru,
      })),
    [categories],
  );

  return (
    <Box>
      <Tabs options={createProductTabOptions} value={activeTabId} onChange={onChangeTab} />

      <TabPanel value={activeTabId} index='settings'>
        <ProductBasicSettingsForm
          productTypes={productTypeOptions}
          defaultValues={fullFormState.basicSettings}
          onChange={handleChangeBasicSettingsForm}
        />
      </TabPanel>

      <TabPanel value={activeTabId} index='filters'>
        <ProductFilterForm
          defaultValues={fullFormState.categoriesIds}
          productTypeId={fullFormState.basicSettings.productType}
          categories={categories}
          onChange={onFilterFormChange}
        />
      </TabPanel>

      <TabPanel value={activeTabId} index='recommended_products'>
        <ProductSelectForm
          isLoading={isProductsLoading}
          selected={fullFormState.productSelect || []}
          categories={categories}
          products={recommendedProducts}
          onChange={onChangeRecommended}
        />
      </TabPanel>
    </Box>
  );
}
