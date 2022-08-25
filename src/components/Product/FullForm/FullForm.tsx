import React, { Dispatch, SetStateAction } from 'react';
import { ProductBasicSettingsFormDto } from '../../../@types/dto/form/product-basic-settings.dto';
import {
  ProductFilterCheeseFormDto,
  ProductFilterMeatFormDto,
} from '../../../@types/dto/form/product-filters.dto';
import { ProductPriceFormDto } from '../../../@types/dto/form/product-price.dto';
import { ProductCategory } from '../../../@types/dto/product/category.dto';
import { Category } from '../../../@types/entities/Category';
import { Product } from '../../../@types/entities/Product';
import { Box } from '../../UI/Box/Box';
import { TabPanel } from '../../UI/Tabs/TabPanel';
import { Tabs } from '../../UI/Tabs/Tabs';
import { ProductBasicSettingsForm } from '../BasicSettingsForm/BasicSettingsForm';
import { ProductFilterForm } from '../FilterForm/FilterForm';
import { PriceProductForm } from '../PriceForm/PriceForm';
import { Product as SelectProduct, ProductSelectForm } from '../SelectForm/SelectForm';
import { createProductTabOptions } from './fullFormConstants';

export type FullFormType = {
  basicSettings: ProductBasicSettingsFormDto;
  priceSettings: ProductPriceFormDto;
  cheeseCategories?: ProductFilterCheeseFormDto;
  meatCategories?: ProductFilterMeatFormDto;
  productSelect?: number[];
};

type ProductFullFormProps = {
  activeTabId: string;
  onChangeTab: (tabId: string) => void;
  isProductsLoading?: boolean;
  categories: Category[];
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
    console.log(data.categoryKey);
    setFullFormState(prevState => {
      if (prevState.basicSettings.categoryKey !== data.categoryKey) {
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

  const onChangeFilterForm = (
    data: ProductFilterCheeseFormDto | ProductFilterMeatFormDto,
    type: ProductCategory
  ) => {
    if (type === 'cheese') {
      setFullFormState(prevState => ({
        ...prevState,
        cheeseCategories: data as ProductFilterCheeseFormDto,
      }));
    } else {
      setFullFormState(prevState => ({
        ...prevState,
        meatCategories: data as ProductFilterMeatFormDto,
      }));
    }
  };

  const onChangeRecommended = (recommendedIds: number[]) => {
    setFullFormState(prevState => ({ ...prevState, productSelect: recommendedIds }));
  };

  const recommendedProducts: SelectProduct[] =
    products?.map(product => ({
      id: product.id,
      title: product.title.ru,
      image: product.images[0]?.small || '',
      category: product.category?.key || '',
      characteristics: product.characteristics,
    })) || [];

  const selectCategoryOptions = categories.map(category => ({
    value: category.key,
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
          categories={selectCategoryOptions}
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
        {fullFormState.basicSettings.categoryKey === 'meat' && (
          <ProductFilterForm
            type="meat"
            meatDefaultValues={fullFormState.meatCategories}
            onChange={onChangeFilterForm}
          />
        )}
        {fullFormState.basicSettings.categoryKey === 'cheese' && (
          <ProductFilterForm
            type="cheese"
            cheeseDefaultValues={fullFormState.cheeseCategories}
            onChange={onChangeFilterForm}
          />
        )}
      </TabPanel>

      <TabPanel value={activeTabId} index="recommended_products">
        <ProductSelectForm
          isLoading={isProductsLoading}
          selected={fullFormState.productSelect || []}
          categories={selectCategoryOptions}
          products={recommendedProducts}
          onChange={onChangeRecommended}
        />
      </TabPanel>
    </Box>
  );
}
