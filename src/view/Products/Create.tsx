import React, { useEffect, useState } from 'react';
import { FieldError } from 'react-hook-form';
import { ProductBasicSettingsFormDto } from '../../@types/dto/form/product-basic-settings.dto';
import {
  ProductFilterCheeseFormDto,
  ProductFilterMeatFormDto,
} from '../../@types/dto/form/product-filters.dto';
import { ProductPriceFormDto } from '../../@types/dto/form/product-price.dto';
import { ProductCategory } from '../../@types/dto/product/category.dto';
import { ProductCreateDto } from '../../@types/dto/product/create.dto';
import { useGetAllCategoriesQuery } from '../../api/categoryApi';
import { useCreateProductMutation, useGetAllProductsQuery } from '../../api/productApi';
import { Header } from '../../components/Header/Header';
import { PriceProductForm } from '../../components/Product/PriceForm/PriceForm';
import { ProductBasicSettingsForm } from '../../components/Product/BasicSettingsForm/BasicSettingsForm';
import { ProductFilterForm } from '../../components/Product/FilterForm/FilterForm';
import {
  Product,
  ProductSelectForm,
} from '../../components/Product/SelectForm/SelectForm';
import { TabPanel } from '../../components/UI/Tabs/TabPanel';
import { Tabs } from '../../components/UI/Tabs/Tabs';
import { Button } from '../../components/UI/Button/Button';
import { Path } from '../../constants/routes';
import { useTo } from '../../hooks/useTo';
import { createProductTabOptions } from './productConstants';

type Props = {
  onSaveHandler: () => void;
  onCancelHandler: () => void;
};

type FullFormType = {
  basicSettings: ProductBasicSettingsFormDto;
  priceSettings: ProductPriceFormDto;
  cheeseCategories?: ProductFilterCheeseFormDto;
  meatCategories?: ProductFilterMeatFormDto;
  productSelect?: number[];
};

function RightContent({ onSaveHandler, onCancelHandler }: Props) {
  return (
    <>
      <Button
        type="submit"
        form="productPriceForm"
        onClick={onSaveHandler}
        sx={{ marginRight: '10px' }}
      >
        Сохранить
      </Button>
      <Button variant="outlined" onClick={onCancelHandler}>
        Отмена
      </Button>
    </>
  );
}

function CreateProductView() {
  const [language, setLanguage] = useState<'ru' | 'en'>('ru');
  const [createProduct] = useCreateProductMutation();
  const { data: categories = [] } = useGetAllCategoriesQuery();

  const to = useTo();
  const [activeTabId, setActiveTabId] = useState('settings');
  const { data: productsData, isLoading: isProductsLoading = false } =
    useGetAllProductsQuery(
      { withSimilarProducts: false, withMeta: false, withRoleDiscount: false },
      { skip: activeTabId !== 'recommended_products' }
    );
  const onCancelHandler = () => to(Path.GOODS);
  const [fullFormState, setFullFormState] = useState<FullFormType>({
    basicSettings: {
      categoryKey: 'cheese',
      title: '',
      description: '',
      metaTitle: '',
      metaDescription: '',
      isIndexed: true,
      metaKeywords: '',
    },
    priceSettings: {
      discount: 0,
      rub: 0,
      eur: 0,
      companyDiscountRub: 0,
      companyDiscountEur: 0,
      collectiveDiscountRub: 0,
      collectiveDiscountEur: 0,
    },
    productSelect: [],
  });
  const onSubmit = async () => {
    const {
      basicSettings,
      priceSettings,
      cheeseCategories,
      meatCategories,
      productSelect,
    } = fullFormState;
    const characteristics =
      basicSettings.categoryKey === 'cheese' ? cheeseCategories : meatCategories;

    const categoryId =
      categories.find(category => category.key === basicSettings.categoryKey)?.id || 0;

    const roleDiscounts = [
      {
        role: 3,
        rub: priceSettings.companyDiscountRub,
        eur: priceSettings.companyDiscountEur,
      },
      {
        role: 4,
        rub: priceSettings.collectiveDiscountRub,
        eur: priceSettings.collectiveDiscountEur,
      },
    ];

    const newProduct: ProductCreateDto = {
      title: {
        en: '',
        ru: basicSettings.title,
      },
      description: {
        en: '',
        ru: basicSettings.description,
      },
      images: [],
      price: {
        rub: +priceSettings.rub,
        eur: +priceSettings.eur,
      },
      characteristics: characteristics || {},
      category: categoryId,
      similarProducts: productSelect || [],
      roleDiscounts,
    };

    await createProduct(newProduct);
  };
  const handleChangeBasicSettingsForm = (data: ProductBasicSettingsFormDto) => {
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
    console.log(data);

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

  const tabsHandler = (id: string) => setActiveTabId(id);

  const recommendedProducts: Product[] =
    productsData?.products.map(product => ({
      id: product.id,
      title: product.title.ru,
      image: product.images[0]?.small || '',
      category: `${product.category?.key}` || '',
      characteristics: product.characteristics,
    })) || [];

  const selectCategoryOptions = categories.map(category => ({
    value: category.key,
    label: category.title.ru,
  }));

  return (
    <div>
      <Header
        leftTitle="Создание товара"
        rightContent={
          <RightContent onSaveHandler={onSubmit} onCancelHandler={onCancelHandler} />
        }
      />
      <Tabs
        options={createProductTabOptions}
        value={activeTabId}
        onChange={tabsHandler}
      />
      <TabPanel value={activeTabId} index="settings">
        <ProductBasicSettingsForm
          categories={selectCategoryOptions}
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
        {fullFormState.basicSettings.categoryKey === 'meat' ? (
          <ProductFilterForm
            type="meat"
            meatDefaultValues={fullFormState.meatCategories}
            onChange={onChangeFilterForm}
          />
        ) : (
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
    </div>
  );
}

export default CreateProductView;
