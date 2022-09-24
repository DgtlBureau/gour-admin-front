import React, { useState } from 'react';

import { ProductCreateDto } from '../../@types/dto/product/create.dto';
import { useGetAllCategoriesQuery } from '../../api/categoryApi';
import { useCreateProductMutation, useGetAllProductsQuery } from '../../api/productApi';
import { useUploadImageMutation } from '../../api/imageApi';
import { Header } from '../../components/Header/Header';
import { Button } from '../../components/UI/Button/Button';
import { Path } from '../../constants/routes';
import { useTo } from '../../hooks/useTo';
import { NotificationType } from '../../@types/entities/Notification';
import { eventBus, EventTypes } from '../../packages/EventBus';
import {
  FullFormType,
  ProductFullForm,
} from '../../components/Product/FullForm/FullForm';
import { useGetClientRolesListQuery } from '../../api/clientRoleApi';
import { getErrorMessage } from '../../utils/errorUtil';

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
  const to = useTo();

  const { data: clientRolesList = [] } = useGetClientRolesListQuery();

  const roles = clientRolesList.filter(
    role => role.key === 'COMPANY' || role.key === 'COLLECTIVE_PURCHASE'
  );

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
    },
    priceSettings: {
      discount: 0,
      cheeseCoin: 0,
      companyDiscount: 0,
      collectiveDiscount: 0,
    },
    categoriesIds: {},
    productSelect: [],
  });

  const [fetchCreateProduct] = useCreateProductMutation();
  const [uploadImage] = useUploadImageMutation();

  const { data: categories = [] } = useGetAllCategoriesQuery();

  const { data: productsData, isLoading: isProductsLoading = false } =
    useGetAllProductsQuery(
      { withCategories: true },
      { skip: activeTabId !== 'recommended_products' }
    );

  const uploadPicture = async (file?: File | string, label?: string) => {
    if (!file || typeof file === 'string') return undefined;

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

  const onSave = async () => {
    const { basicSettings, priceSettings, productSelect } = fullFormState;

    const productTypeId = Number(fullFormState.basicSettings.productType);
    const categoryIds = [
      ...Object.values(fullFormState.categoriesIds),
      productTypeId,
    ].filter(i => i);

    const roleDiscounts = roles.map(role => ({
      role: role.id,
      cheeseCoin:
        role.key === 'COMPANY'
          ? priceSettings.companyDiscount
          : priceSettings.collectiveDiscount,
    }));

    const fistImage = await uploadPicture(basicSettings.firstImage, '1');
    const secondImage = await uploadPicture(basicSettings.secondImage, '2');
    const thirdImage = await uploadPicture(basicSettings.thirdImage, '3');

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
      price: {
        cheeseCoin: +priceSettings.cheeseCoin,
      },
      categoryIds,
      similarProducts: productSelect || [],
      roleDiscounts,
    };

    try {
      await fetchCreateProduct(newProduct).unwrap();

      eventBus.emit(EventTypes.notification, {
        message: 'Товар создан',
        type: NotificationType.SUCCESS,
      });

      to(Path.PRODUCTS);
    } catch (error) {
      const message = getErrorMessage(error);

      eventBus.emit(EventTypes.notification, {
        message,
        type: NotificationType.DANGER,
      });
    }
  };

  const onCancel = () => to(Path.PRODUCTS);

  return (
    <div>
      <Header
        leftTitle="Создание товара"
        rightContent={<RightContent onSaveHandler={onSave} onCancelHandler={onCancel} />}
      />
      <ProductFullForm
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
