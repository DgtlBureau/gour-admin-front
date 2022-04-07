import React, { useEffect, useState } from 'react';
import { FieldError } from 'react-hook-form';
import { ProductBasicSettingsFormDto } from '../../@types/dto/form/product-basic-settings.dto';
import {
  ProductFilterCheeseFormDto,
  ProductFilterMeatFormDto,
} from '../../@types/dto/form/product-filters.dto';
import { ProductPriceFormDto } from '../../@types/dto/form/product-price.dto';
import { ProductRecommendedFormDto } from '../../@types/dto/form/product-recommended.dto';
import { ProductCreateDto } from '../../@types/dto/product/create.dto';
import { useCreateProductMutation } from '../../api/productApi';
import { Header } from '../../components/Header/Header';
import { PriceProductForm } from '../../components/PriceProductForm/PriceProductForm';
import { ProductBasicSettingsForm } from '../../components/Product/BasicSettingsForm/BasicSettingsForm';
import { ProductFilterForm } from '../../components/Product/FilterForm/FilterForm';
import { ProductRecommendedForm } from '../../components/Product/RecommendedForm/RecommendedForm';
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
  productFilter?: ProductFilterCheeseFormDto | ProductFilterMeatFormDto;
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
  const [createProduct] = useCreateProductMutation();

  const to = useTo();
  const [activeTabId, setActiveTabId] = useState('settings');

  const onCancelHandler = () => to(Path.GOODS);

  const [fullFormState, setFullFormState] = useState<FullFormType>({
    basicSettings: {
      category: 0,
      title: '',
      description: '',
      metaTitle: '',
      metaDescription: '',
      isIndexed: true,
      metaKeywords: '',
    },
    priceSettings: {
      iRub: 0,
      iEuro: 0,
      oRub: 0,
      oEuro: 0,
      eRub: 0,
      eEuro: 0,
    },
  });

  const [fullFormErrors, setFullFormErrors] = useState<
    Record<string, FieldError | undefined>
  >({});

  const onSubmit = async () => {
    const newProduct: ProductCreateDto = {
      title: {
        en: '',
        ru: fullFormState.basicSettings.title,
      },
      description: {
        en: '',
        ru: fullFormState.basicSettings.description,
      },
      images: [],
      price: {
        rub: fullFormState.priceSettings.iRub,
        eur: fullFormState.priceSettings.iEuro,
      },
      characteristics: {},
      category: fullFormState.basicSettings.category,
      similarProducts: [],
    };

    await createProduct(newProduct);
  };

  const handleError = (errors: Record<string, FieldError | undefined>) => {
    setFullFormErrors(prevState => ({ ...prevState, ...errors }));
  };

  const handleChangeBasicSettingsForm = (data: ProductBasicSettingsFormDto) => {
    setFullFormState(prevState => ({ ...prevState, basicSettings: data }));
  };

  const onChangePrice = (data: ProductPriceFormDto) => {
    setFullFormState(prevState => ({ ...prevState, priceSettings: data }));
  };

  const onChangeFilterForm = (
    data: ProductFilterCheeseFormDto | ProductFilterMeatFormDto
  ) => {
    console.log(data);
  };

  const onSubmitRecommended = (data: ProductRecommendedFormDto) => {
    console.log(data);
  };

  const tabsHandler = (id: string) => setActiveTabId(id);

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
          defaultValues={fullFormState.basicSettings}
          onChange={handleChangeBasicSettingsForm}
          onError={handleError}
        />
      </TabPanel>
      <TabPanel value={activeTabId} index="prices">
        <PriceProductForm
          defaultValues={fullFormState.priceSettings}
          onChange={onChangePrice}
          onError={handleError}
        />
      </TabPanel>
      <TabPanel value={activeTabId} index="filters">
        <ProductFilterForm type="meat" onChange={onChangeFilterForm} />
      </TabPanel>
      <TabPanel value={activeTabId} index="recommended_products">
        <ProductRecommendedForm onSubmit={onSubmitRecommended} />
      </TabPanel>
    </div>
  );
}

export default CreateProductView;
