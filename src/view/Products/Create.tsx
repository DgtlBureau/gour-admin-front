import React, { useEffect, useState } from 'react';
import { FieldError } from 'react-hook-form';
import { ProductBasicSettingsFormDto } from '../../@types/dto/form/product-basic-settings.dto';
import {
  ProductFilterCheeseFormDto,
  ProductFilterMeatFormDto,
} from '../../@types/dto/form/product-filters.dto';
import { ProductPriceFormDto } from '../../@types/dto/form/product-price.dto';
import { ProductCreateDto } from '../../@types/dto/product/create.dto';
import { useGetAllCategoriesQuery } from '../../api/categoryApi';
import { useCreateProductMutation, useGetAllProductsQuery } from '../../api/productApi';
import { Header } from '../../components/Header/Header';
import { PriceProductForm } from '../../components/PriceProductForm/PriceProductForm';
import { ProductBasicSettingsForm } from '../../components/Product/BasicSettingsForm/BasicSettingsForm';
import { ProductFilterForm } from '../../components/Product/FilterForm/FilterForm';
import {
  Product,
  ProductSelectForm,
} from '../../components/ProductSelectForm/ProductSelectForm';
import { TabPanel } from '../../components/Tabs/TabPanel';
import { Tabs } from '../../components/Tabs/Tabs';
import { Button } from '../../components/UI/Button/Button';
import { Path } from '../../constants/routes';
import { useTo } from '../../hooks/useTo';

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

const tabs = [
  {
    id: 'settings',
    label: 'Основные настройки',
  },
  {
    id: 'prices',
    label: 'Цены',
  },
  {
    id: 'filters',
    label: 'Фильтры',
  },
  {
    id: 'recommended_products',
    label: 'Рекомендуемые товары',
  },
];

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
      iRub: 0,
      iEuro: 0,
      oRub: 0,
      oEuro: 0,
      eRub: 0,
      eEuro: 0,
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
        role: 1,
        rub: priceSettings.eRub,
        eur: priceSettings.eEuro,
      },
      {
        role: 2,
        rub: priceSettings.oRub,
        eur: priceSettings.oEuro,
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
        rub: priceSettings.iRub,
        eur: priceSettings.iEuro,
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
    setFullFormState(prevState => ({ ...prevState, priceSettings: data }));
  };
  const onChangeFilterForm = (
    data: ProductFilterCheeseFormDto | ProductFilterMeatFormDto,
    type: 'meat' | 'cheese'
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

  const recommendedProduct: Product[] =
    productsData?.products.map(product => ({
      id: product.id,
      title: product.title.ru,
      image: product.images[0]?.small || '',
      category: `${product.category?.key}` || '',
      characteristics: [],
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
      <Tabs options={tabs} selectedId={activeTabId} onChange={tabsHandler} />
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
        {fullFormState.basicSettings.categoryKey === 'cheese' ? (
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
          products={recommendedProduct}
          onChange={onChangeRecommended}
        />
      </TabPanel>
    </div>
  );
}

export default CreateProductView;
