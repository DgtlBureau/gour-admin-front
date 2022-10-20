import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Path } from 'constants/routes';

import { useGetAllCategoriesQuery } from 'api/categoryApi';
import { useUploadImageMutation } from 'api/imageApi';
import { useGetAllProductsQuery, useGetProductByIdQuery, useUpdateProductMutation } from 'api/productApi';

import { Header } from 'components/Header/Header';
import { FullFormType, ProductFullForm } from 'components/Product/FullForm/FullForm';
import { Button } from 'components/UI/Button/Button';
import { ProgressLinear } from 'components/UI/ProgressLinear/ProgressLinear';
import { Typography } from 'components/UI/Typography/Typography';

import { ProductCreateDto } from 'types/dto/product/create.dto';
import { NotificationType } from 'types/entities/Notification';

import { EventTypes, eventBus } from 'packages/EventBus';

import { useTo } from '../../hooks/useTo';

type Props = {
  onSaveClick: () => void;
  onCancelHandler: () => void;
};

function RightContent({ onSaveClick, onCancelHandler }: Props) {
  return (
    <>
      <Button onClick={onSaveClick} sx={{ marginRight: '10px' }}>
        Сохранить
      </Button>
      <Button variant='outlined' onClick={onCancelHandler}>
        Отмена
      </Button>
    </>
  );
}

function EditProductView() {
  const lang = 'ru';
  const to = useTo();

  const { id } = useParams();

  const productId = id ? +id : 0;

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
    priceSettings: {
      discount: 0,
      cheeseCoin: 0,
      companyDiscount: 0,
      collectiveDiscount: 0,
    },
    productSelect: [],
    categoriesIds: {},
  });

  const [uploadImage] = useUploadImageMutation();
  const [fetchUpdateProduct] = useUpdateProductMutation();
  const { data: categories = [] } = useGetAllCategoriesQuery();
  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery(
    {
      id: productId,
      withSimilarProducts: true,
      withMeta: true,
      withRoleDiscount: true,
      withCategories: true,
    },
    { skip: !productId },
  );
  const { data: productsList } = useGetAllProductsQuery(
    {
      withSimilarProducts: true,
      withMeta: true,
      withRoleDiscount: false,
      withCategories: true,
    },
    { skip: activeTabId !== 'recommended_products' },
  );

  const uploadPicture = async (file?: File, label?: string) => {
    if (!file) return undefined;

    const formData = new FormData();

    formData.append('image', file);

    const image = await uploadImage(formData).unwrap();

    if (!image) {
      eventBus.emit(EventTypes.notification, {
        message: `Произошла ошибка при загрузке фото ${label})`,
        type: NotificationType.DANGER,
      });
    }

    return image;
  };

  useEffect(() => {
    if (!product) return;
    const productSelect = product.similarProducts?.map(similarProduct => similarProduct.id) || [];

    // TODO: обработка старых продуктов, можно удалить в будущем
    const productType = product.categories[0].id || null;
    const categoriesIds =
      product.categories[0].subCategories?.reduce(
        (acc, midCategory) => ({
          ...acc,
          [midCategory.id]: midCategory.subCategories[0].id,
        }),
        {},
      ) || [];

    setFullFormState({
      basicSettings: {
        productType,
        title: product.title[lang] || '',
        description: product.description[lang] || '',
        metaTitle: product.meta?.metaTitle[lang] || '',
        metaDescription: product.meta?.metaDescription[lang] || '',
        isIndexed: product.meta?.isIndexed || false,
        metaKeywords: product.meta?.metaKeywords[lang] || '',
        firstImage: product.images[0]?.full,
        secondImage: product.images[1]?.full,
        thirdImage: product.images[2]?.full,
        moyskladId: product.moyskladId?.toString() || '',
      },
      priceSettings: {
        discount: 0,
        cheeseCoin: product.price.cheeseCoin,
        companyDiscount: 0,
        collectiveDiscount: 0,
      },
      categoriesIds,
      productSelect,
    });
  }, [product]);

  const onSave = async () => {
    const { basicSettings, priceSettings, productSelect } = fullFormState;

    const productTypeId = Number(fullFormState.basicSettings.productType);
    const categoryIds = [...Object.values(fullFormState.categoriesIds), productTypeId].filter(i => i);

    const roleDiscounts = [
      {
        role: 3,
        cheeseCoin: priceSettings.companyDiscount,
      },
      {
        role: 4,
        cheeseCoin: priceSettings.collectiveDiscount,
      },
    ];

    const firstImage =
      typeof basicSettings.firstImage === 'string'
        ? product?.images[0]
        : await uploadPicture(basicSettings.firstImage, '1');
    const secondImage =
      typeof basicSettings.secondImage === 'string'
        ? product?.images[1]
        : await uploadPicture(basicSettings.secondImage, '2');
    const thirdImage =
      typeof basicSettings.thirdImage === 'string'
        ? product?.images[2]
        : await uploadPicture(basicSettings.thirdImage, '3');

    const images: number[] = [];

    [firstImage, secondImage, thirdImage].forEach(it => it && images.push(it.id));

    const productParams: ProductCreateDto = {
      title: {
        en: '',
        ru: basicSettings.title,
      },
      description: {
        en: '',
        ru: basicSettings.description,
      },
      images,
      price: {
        cheeseCoin: +priceSettings.cheeseCoin,
      },
      categoryIds,
      similarProducts: productSelect || [],
      roleDiscounts,
      moyskladId: basicSettings.moyskladId || null,
      // TODO: добавить валидацию перед отправкой
    };

    try {
      await fetchUpdateProduct({ id: productId, ...productParams }).unwrap();
      eventBus.emit(EventTypes.notification, {
        message: 'Товар изменен',
        type: NotificationType.SUCCESS,
      });
      to(Path.PRODUCTS);
    } catch (error) {
      eventBus.emit(EventTypes.notification, {
        message: 'Произошла ошибка',
        type: NotificationType.DANGER,
      });
    }
  };

  const onCancel = () => to(Path.PRODUCTS);

  if (isLoading) return <ProgressLinear variant='query' />;

  if (!isLoading && isError) {
    return <Typography variant='h5'>Произошла ошибка</Typography>;
  }

  if (!isLoading && !isError && !product) {
    return <Typography variant='h5'>Продукт не найден</Typography>;
  }

  return (
    <div>
      <Header
        leftTitle='Редактирование товара'
        rightContent={<RightContent onSaveClick={onSave} onCancelHandler={onCancel} />}
      />
      <ProductFullForm
        activeTabId={activeTabId}
        onChangeTab={setActiveTabId}
        categories={categories}
        products={productsList?.products.filter(it => it.id !== productId) || []}
        fullFormState={fullFormState}
        setFullFormState={setFullFormState}
        mode='edit'
      />
    </div>
  );
}

export default EditProductView;
