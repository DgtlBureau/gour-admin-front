import { useState } from 'react';

import { useGetAllCategoriesQuery } from 'api/categoryApi';
import { useGetClientRoleListQuery } from 'api/clientRoleApi';
import { useUploadImageMutation } from 'api/imageApi';
import { useCreateProductMutation, useGetAllProductsQuery } from 'api/productApi';

import { Header } from 'components/Header/Header';
import { validateBasicSettings } from 'components/Product/BasicSettingsForm/validation';
import { FullFormType, ProductFullForm } from 'components/Product/FullForm/FullForm';
import { Button } from 'components/UI/Button/Button';

import { ProductCreateDto, RoleDiscountDto } from 'types/dto/product/create.dto';
import { NotificationType } from 'types/entities/Notification';

import { EventTypes, dispatchNotification, eventBus } from 'packages/EventBus';
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
    price: {
      cheeseCoin: 0,
      individual: 0,
      company: 0,
      collective: 0,
    },
    categoriesIds: {},
    productSelect: [],
  });

  const [fetchCreateProduct] = useCreateProductMutation();
  const [uploadImage] = useUploadImageMutation();

  const { data: categories = [] } = useGetAllCategoriesQuery();

  const { data: productsData, isLoading: isProductsLoading } = useGetAllProductsQuery(
    { withCategories: true },
    { skip: activeTabId !== 'recommended' },
  );

  const { data: clientRoles = [] } = useGetClientRoleListQuery();

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
    const { basicSettings, price, productSelect } = fullFormState;

    const [isValid, err] = await validateBasicSettings(basicSettings);
    if (!isValid) {
      dispatchNotification(err?.message, { type: NotificationType.DANGER });
      return;
    }

    const productTypeId = Number(fullFormState.basicSettings.productType);
    const categoryIds = [...Object.values(fullFormState.categoriesIds), productTypeId].filter(i => i);

    const fistImage = basicSettings.firstImage && (await uploadPicture(basicSettings.firstImage));
    const secondImage = basicSettings.secondImage && (await uploadPicture(basicSettings.secondImage));
    const thirdImage = basicSettings.thirdImage && (await uploadPicture(basicSettings.thirdImage));

    const images: number[] = [];

    [fistImage, secondImage, thirdImage].forEach(it => it && images.push(it.id));

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

    const newProduct: ProductCreateDto = {
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
        categories={categories}
        products={products}
        roles={clientRoles}
        fullFormState={fullFormState}
        onChangeTab={setActiveTabId}
        setFullFormState={setFullFormState}
      />
    </div>
  );
}

export default CreateProductView;
