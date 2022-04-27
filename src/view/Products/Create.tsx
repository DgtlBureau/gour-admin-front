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
import { NotificationType } from '../../@types/entities/Notification';
import { eventBus, EventTypes } from '../../packages/EventBus';
import {
  FullFormType,
  ProductFullForm,
} from '../../components/Product/FullForm/FullForm';

type Props = {
  onSaveHandler: () => void;
  onCancelHandler: () => void;
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
  const language = 'ru';
  const to = useTo();

  const [activeTabId, setActiveTabId] = useState('settings');
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

  const [fetchCreateProduct] = useCreateProductMutation();
  const { data: categories = [] } = useGetAllCategoriesQuery();
  const { data: productsData, isLoading: isProductsLoading = false } =
    useGetAllProductsQuery(
      { withSimilarProducts: false, withMeta: false, withRoleDiscount: false },
      { skip: activeTabId !== 'recommended_products' }
    );

  const onSave = async () => {
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

    try {
      await fetchCreateProduct(newProduct).unwrap();
      eventBus.emit(EventTypes.notification, {
        message: 'Товар создан',
        type: NotificationType.SUCCESS,
      });
      to(Path.GOODS);
    } catch (error) {
      eventBus.emit(EventTypes.notification, {
        message: 'Произошла ошибка',
        type: NotificationType.DANGER,
      });
      console.log(error);
    }
  };

  const onCancel = () => to(Path.GOODS);

  return (
    <div>
      <Header
        leftTitle="Создание товара"
        rightContent={<RightContent onSaveHandler={onSave} onCancelHandler={onCancel} />}
      />
      <ProductFullForm
        language={language}
        activeTabId={activeTabId}
        isProductsLoading={isProductsLoading}
        onChangeTab={setActiveTabId}
        categories={categories}
        products={productsData?.products || []}
        fullFormState={fullFormState}
        setFullFormState={setFullFormState}
        mode="create"
      />
    </div>
  );
}

export default CreateProductView;
