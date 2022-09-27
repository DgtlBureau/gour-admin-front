import React, { Dispatch, SetStateAction } from 'react';
import { ProductBasicSettingsFormDto } from '../../../@types/dto/form/product-basic-settings.dto';
import { ProductPriceFormDto } from '../../../@types/dto/form/product-price.dto';
import { TopLevelCategory } from '../../../@types/entities/Category';
import { Product } from '../../../@types/entities/Product';
import { Box } from '../../UI/Box/Box';
import { TabPanel } from '../../UI/Tabs/TabPanel';
import { Tabs } from '../../UI/Tabs/Tabs';
import { ProductBasicSettingsForm } from '../BasicSettingsForm/BasicSettingsForm';
import { ProductFilterForm } from '../FilterForm/FilterForm';
import { PriceProductForm } from '../PriceForm/PriceForm';
import { ProductSelectForm } from '../SelectForm/SelectForm';
import type { Product as SelectProduct } from '../SelectForm/types';
import { createProductTabOptions } from './fullFormConstants';

export type FullFormType = {
  basicSettings: ProductBasicSettingsFormDto;
  priceSettings: ProductPriceFormDto;
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
  mode: 'create' | 'edit';
  fullFormState: FullFormType;
  setFullFormState: Dispatch<SetStateAction<FullFormType>>;
};

export function ProductFullForm({
  mode,
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

  const onChangePrice = (data: ProductPriceFormDto) => {
    setFullFormState(prevState => ({ ...prevState, priceSettings: data }));
  };

  const onChangeRecommended = (recommendedIds: number[]) => {
    setFullFormState(prevState => ({ ...prevState, productSelect: recommendedIds }));
  };

  const onFilterFormChange = React.useCallback(
    (selectedCategories: Record<string, number>) => {
      setFullFormState(prevState => ({
        ...prevState,
        categoriesIds: selectedCategories,
      }));
    },
    []
  );

  const recommendedProducts: SelectProduct[] =
    products?.map(product => ({
      id: product.id,
      title: product.title.ru,
      image: product.images[0]?.small || '',
      categories: product.categories,
    })) || [];

  const productTypeOptions = categories.map(category => ({
    value: category.id,
    label: category.title.ru,
  }));

  return (
    <Box>
      <Tabs
        options={createProductTabOptions}
        value={activeTabId}
        onChange={onChangeTab}
      />

      <TabPanel value={activeTabId} index="settings">
        <ProductBasicSettingsForm
          productTypes={productTypeOptions}
          mode={mode}
          defaultValues={fullFormState.basicSettings}
          onChange={handleChangeBasicSettingsForm}
        />
      </TabPanel>

      <TabPanel value={activeTabId} index="prices">
        <PriceProductForm
          defaultValues={fullFormState.priceSettings}
          onChange={onChangePrice}
        />
      </TabPanel>

      <TabPanel value={activeTabId} index="filters">
        <ProductFilterForm
          defaultValues={fullFormState.categoriesIds}
          productTypeId={fullFormState.basicSettings.productType}
          categories={categories}
          onChange={onFilterFormChange}
        />
      </TabPanel>

      <TabPanel value={activeTabId} index="recommended_products">
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
