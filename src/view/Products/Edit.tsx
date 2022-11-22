import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetAllCategoriesQuery } from 'api/categoryApi';
import { useGetClientRoleListQuery } from 'api/clientRoleApi';
import { useUploadImageMutation } from 'api/imageApi';
import { useGetAllProductsQuery, useGetProductByIdQuery, useUpdateProductMutation } from 'api/productApi';

import { Header } from 'components/Header/Header';
import { FullFormType, ProductFullForm } from 'components/Product/FullForm/FullForm';
import { Button } from 'components/UI/Button/Button';
import { ProgressLinear } from 'components/UI/ProgressLinear/ProgressLinear';
import { Typography } from 'components/UI/Typography/Typography';

import { ProductCreateDto, RoleDiscountDto } from 'types/dto/product/create.dto';
import { NotificationType } from 'types/entities/Notification';

import { EventTypes, eventBus } from 'packages/EventBus';
import { getErrorMessage } from 'utils/errorUtil';

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

  const { toProductList } = useTo();

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
    price: {
      cheeseCoin: 0,
      individual: 0,
      company: 0,
      collective: 0,
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
  const { data: clientRoles = [] } = useGetClientRoleListQuery();

  const uploadPicture = async (file: File) => {
    try {
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

    const roleDiscounts = product.roleDiscounts.reduce((acc, it) => {
      acc[it.role.key] = it.value || 0;

      return acc;
    }, {} as Record<string, number | undefined>);

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
      price: {
        cheeseCoin: product.price?.cheeseCoin || 0,
        ...roleDiscounts,
      },
      categoriesIds,
      productSelect,
    });
  }, [product]);

  const onSave = async () => {
    const { basicSettings, price, productSelect } = fullFormState;

    const productTypeId = Number(fullFormState.basicSettings.productType);
    const categoryIds = [...Object.values(fullFormState.categoriesIds), productTypeId].filter(i => i);

    const firstImage =
      typeof basicSettings.firstImage === 'string'
        ? product?.images[0]
        : basicSettings.firstImage && (await uploadPicture(basicSettings.firstImage));
    const secondImage =
      typeof basicSettings.secondImage === 'string'
        ? product?.images[1]
        : basicSettings.secondImage && (await uploadPicture(basicSettings.secondImage));
    const thirdImage =
      typeof basicSettings.thirdImage === 'string'
        ? product?.images[2]
        : basicSettings.thirdImage && (await uploadPicture(basicSettings.thirdImage));

    const images: number[] = [];

    [firstImage, secondImage, thirdImage].forEach(it => it && images.push(it.id));

    const { cheeseCoin, ...discounts } = price;

    const roleDiscounts = Object.keys(discounts).reduce((acc, key) => {
      const role = clientRoles.find(clientRole => clientRole.key === key);
      const value = discounts[key];

      if (!role || !value) return acc;

      const roleDiscount = {
        role: role.id,
        value: +value,
      };

      acc.push(roleDiscount);

      return acc;
    }, [] as RoleDiscountDto[]);

    const productParams: ProductCreateDto = {
      title: {
        en: '',
        ru: basicSettings.title,
      },
      description: {
        en: '',
        ru: basicSettings.description,
      },
      price: {
        cheeseCoin: +cheeseCoin,
      },
      roleDiscounts,
      images,
      categoryIds,
      similarProducts: productSelect || [],
      moyskladId: basicSettings.moyskladId || null,
      // TODO: добавить валидацию перед отправкой
    };

    try {
      await fetchUpdateProduct({ id: productId, ...productParams }).unwrap();
      eventBus.emit(EventTypes.notification, {
        message: 'Товар изменен',
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
        rightContent={<RightContent onSaveClick={onSave} onCancelHandler={toProductList} />}
      />
      <ProductFullForm
        activeTabId={activeTabId}
        categories={categories}
        products={productsList?.products.filter(it => it.id !== productId) || []}
        fullFormState={fullFormState}
        roles={clientRoles}
        onChangeTab={setActiveTabId}
        setFullFormState={setFullFormState}
      />
    </div>
  );
}

export default EditProductView;
