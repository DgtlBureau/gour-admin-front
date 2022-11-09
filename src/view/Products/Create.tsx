import React, { useState } from 'react';

import { useGetAllCategoriesQuery } from 'api/categoryApi';
import { useUploadImageMutation } from 'api/imageApi';
import { useCreateProductMutation, useGetAllProductsQuery } from 'api/productApi';

import { Header } from 'components/Header/Header';
import { FullFormType, ProductFullForm } from 'components/Product/FullForm/FullForm';
import { Button } from 'components/UI/Button/Button';

import { ProductCreateDto } from 'types/dto/product/create.dto';
import { NotificationType } from 'types/entities/Notification';

import { EventTypes, eventBus } from 'packages/EventBus';
import { getErrorMessage } from 'utils/errorUtil';

import { useTo } from '../../hooks/useTo';

type Props = {
  onSaveHandler: () => void;
  onCancelHandler: () => void;
};

function RightContent({ onSaveHandler, onCancelHandler }: Props) {
  return (
    <>
      <Button type='submit' form='productPriceForm' onClick={onSaveHandler} sx={{ marginRight: '10px' }}>
        Сохранить
      </Button>
      <Button variant='outlined' onClick={onCancelHandler}>
        Отмена
      </Button>
    </>
  );
}

function CreateProductView() {
  const { toProductList } = useTo();

  const [activeTabId, setActiveTabId] = useState('settings');
  const [fullFormState, setFullFormState] = useState<FullFormType>({
    basicSettings: {
      productType: null,
      title: '',
      description: '',
      metaTitle: '',
      metaDescription: '',
      isIndexed: true,
      metaKeywords: '',
      moyskladId: '',
    },
    categoriesIds: {},
    productSelect: [],
  });

  const [fetchCreateProduct] = useCreateProductMutation();
  const [uploadImage] = useUploadImageMutation();

  const { data: categories = [] } = useGetAllCategoriesQuery();

  const { data: productsData, isLoading: isProductsLoading } = useGetAllProductsQuery(
    { withCategories: true },
    { skip: activeTabId !== 'recommended_products' },
  );

  const products = productsData?.products || [];

  const uploadPicture = async (file: File | string) => {
    try {
      if (typeof file === 'string') return undefined;

      const formData = new FormData();

      formData.append('image', file);

      const image = await uploadImage(formData).unwrap();

      return image;
    } catch (error) {
      const message = getErrorMessage(error);

      eventBus.emit(EventTypes.notification, {
        message,
        type: NotificationType.DANGER,
      });

      return undefined;
    }
  };

  const onSave = async () => {
    const { basicSettings, productSelect } = fullFormState;

    const productTypeId = Number(fullFormState.basicSettings.productType);
    const categoryIds = [...Object.values(fullFormState.categoriesIds), productTypeId].filter(i => i);

    const fistImage = basicSettings.firstImage && (await uploadPicture(basicSettings.firstImage));
    const secondImage = basicSettings.secondImage && (await uploadPicture(basicSettings.secondImage));
    const thirdImage = basicSettings.thirdImage && (await uploadPicture(basicSettings.thirdImage));

    const images: number[] = [];

    [fistImage, secondImage, thirdImage].forEach(it => it && images.push(it.id));

    const newProduct: ProductCreateDto = {
      title: {
        en: '',
        ru: basicSettings.title,
      },
      description: {
        en: '',
        ru: basicSettings.description,
      },
      images,
      categoryIds,
      similarProducts: productSelect || [],
      moyskladId: basicSettings.moyskladId || null,
    };

    try {
      await fetchCreateProduct(newProduct).unwrap();

      eventBus.emit(EventTypes.notification, {
        message: 'Товар создан',
        type: NotificationType.SUCCESS,
      });

      toProductList();
    } catch (error) {
      const message = getErrorMessage(error);

      eventBus.emit(EventTypes.notification, {
        message,
        type: NotificationType.DANGER,
      });
    }
  };

  return (
    <div>
      <Header
        leftTitle='Создание товара'
        rightContent={<RightContent onSaveHandler={onSave} onCancelHandler={toProductList} />}
      />
      <ProductFullForm
        activeTabId={activeTabId}
        isProductsLoading={isProductsLoading}
        onChangeTab={setActiveTabId}
        categories={categories}
        products={products}
        fullFormState={fullFormState}
        setFullFormState={setFullFormState}
      />
    </div>
  );
}

export default CreateProductView;
