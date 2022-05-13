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
import { Image } from '../../@types/entities/Image';

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
  const [uploadImage, { data: imageData }] = useUploadImageMutation();

  const [images, setImages] = useState<Image[]>([]);

  const { data: categories = [] } = useGetAllCategoriesQuery();

  const { data: productsData, isLoading: isProductsLoading = false } =
    useGetAllProductsQuery(
      { withSimilarProducts: false, withMeta: false, withRoleDiscount: false },
      { skip: activeTabId !== 'recommended_products' }
    );

  const uploadPhoto = async (image: File, i: number) => {
    const formData = new FormData();

    formData.append('image', image);

    try {
      await uploadImage(formData).unwrap();
      if (imageData) {
        const updatedImages = images.slice();
        updatedImages.splice(i, 1, imageData);
        setImages(updatedImages);
      }
    } catch (error) {
      eventBus.emit(EventTypes.notification, {
        message: `Произошла ошибка при загрузке фото ${i + 1}`,
        type: NotificationType.DANGER,
      });
    }
  };

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

    const roleDiscounts =
      roles.map(role => {
        if (role.key === 'COMPANY') {
          return {
            role: role.id,
            rub: priceSettings.companyDiscountRub,
            eur: priceSettings.companyDiscountEur,
          };
        }
        return {
          role: role.id,
          rub: priceSettings.collectiveDiscountRub,
          eur: priceSettings.collectiveDiscountEur,
        };
      }) || [];

    [
      basicSettings.firstImage,
      basicSettings.secondImage,
      basicSettings.thirdImage,
    ].forEach((image, i) => image && uploadPhoto(image, i));

    const newProduct: ProductCreateDto = {
      title: {
        en: '',
        ru: basicSettings.title,
      },
      description: {
        en: '',
        ru: basicSettings.description,
      },
      images: images.map(image => image.id),
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
