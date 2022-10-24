import React, { useRef } from 'react';

import { formatISO } from 'date-fns';

import { useGetAllCategoriesQuery } from 'api/categoryApi';
import { useUploadImageMutation } from 'api/imageApi';
import { useGetAllProductsQuery } from 'api/productApi';
import { useCreatePromotionMutation } from 'api/promotionApi';

import { Header } from 'components/Header/Header';
import { CreateStockForm } from 'components/Stock/CreateForm/CreateForm';
import { Button } from 'components/UI/Button/Button';

import { CreateStockFormDto } from 'types/dto/form/create-stock.dto';
import { PromotionCreateDto } from 'types/dto/promotion/create.dto';
import { NotificationType } from 'types/entities/Notification';

import { EventTypes, eventBus } from 'packages/EventBus';
import { getErrorMessage } from 'utils/errorUtil';

import defaultImage from 'assets/images/default.svg';

import { useTo } from '../../hooks/useTo';

type RightContentProps = {
  onSave(): void;
  onCancel(): void;
};

function RightContent({ onSave, onCancel }: RightContentProps) {
  return (
    <>
      <Button onClick={onSave} sx={{ margin: '0 10px' }}>
        Сохранить
      </Button>
      <Button variant='outlined' onClick={onCancel}>
        Отмена
      </Button>
    </>
  );
}

function CreateStockView() {
  const { toStockList } = useTo();

  const { products } = useGetAllProductsQuery(
    { withCategories: true },
    {
      selectFromResult: ({ data }) => ({
        products:
          data?.products?.map(it => ({
            id: it.id,
            title: it.title.ru,
            image: it.images[0]?.small || defaultImage,
            categories: it.categories,
          })) || [],
      }),
    },
  );
  const { data: categories = [] } = useGetAllCategoriesQuery();

  const [createPromotion] = useCreatePromotionMutation();
  const [uploadImage] = useUploadImageMutation();

  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const submitStockForm = () => submitBtnRef?.current?.click();

  const uploadPicture = async (file?: File | string) => {
    try {
      if (!file || typeof file === 'string') return undefined;

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

  const save = async (data: CreateStockFormDto) => {
    const cardImage = await uploadPicture(data.smallPhoto);
    const pageImage = await uploadPicture(data.fullPhoto);

    const promotion: PromotionCreateDto = {
      title: {
        ru: data.title,
        en: '',
      },
      description: {
        ru: data.description,
        en: '',
      },
      cardImageId: cardImage?.id,
      pageImageId: pageImage?.id,
      discount: data.discount,
      start: formatISO(data.start),
      end: formatISO(data.end),
      products: data.productIdList,
      pageMeta: {
        metaTitle: {
          ru: data.metaTitle || '',
          en: '',
        },
        metaDescription: {
          ru: data.metaDescription || '',
          en: '',
        },
        metaKeywords: {
          ru: data.metaKeywords || '',
          en: '',
        },
        isIndexed: !!data.isIndexed,
      },
    };

    try {
      await createPromotion(promotion).unwrap();

      eventBus.emit(EventTypes.notification, {
        message: 'Акция создана',
        type: NotificationType.SUCCESS,
      });

      toStockList();
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
        leftTitle='Создание акции'
        rightContent={<RightContent onCancel={toStockList} onSave={submitStockForm} />}
      />
      <CreateStockForm products={products} categories={categories} submitBtnRef={submitBtnRef} onChange={save} />
    </div>
  );
}

export default CreateStockView;
