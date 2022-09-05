import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { formatISO } from 'date-fns';

import {
  useGetPromotionByIdQuery,
  useUpdatePromotionMutation,
} from '../../api/promotionApi';
import { CreateStockForm } from '../../components/Stock/CreateForm/CreateForm';
import { Header } from '../../components/Header/Header';
import { Button } from '../../components/UI/Button/Button';
import { Typography } from '../../components/UI/Typography/Typography';
import { ProgressLinear } from '../../components/UI/ProgressLinear/ProgressLinear';
import { Path } from '../../constants/routes';
import { useTo } from '../../hooks/useTo';
import { useGetAllProductsQuery } from '../../api/productApi';
import { useGetAllCategoriesQuery } from '../../api/categoryApi';
import { useUploadImageMutation } from '../../api/imageApi';
import { eventBus, EventTypes } from '../../packages/EventBus';
import { PromotionUpdateDto } from '../../@types/dto/promotion/update.dto';
import { CreateStockFormDto } from '../../@types/dto/form/create-stock.dto';
import { NotificationType } from '../../@types/entities/Notification';

import noImage from '../../assets/images/no-image.svg';

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
      <Button variant="outlined" onClick={onCancel}>
        Отмена
      </Button>
    </>
  );
}

function CreateStockView() {
  const { id } = useParams();

  const to = useTo();

  const { data: productsData } = useGetAllProductsQuery({});
  const { data: categoriesData } = useGetAllCategoriesQuery();
  const { data: promotion, isLoading, isError } = useGetPromotionByIdQuery(Number(id));

  const [updatePromotion] = useUpdatePromotionMutation();
  const [uploadImage] = useUploadImageMutation();

  const [defaultValues, setDefaultValues] =
    useState<CreateStockFormDto | undefined>(undefined);

  useEffect(() => {
    if (!promotion) return;

    const values = {
      title: promotion?.title.ru || '',
      description: promotion?.description.ru || '',
      smallPhoto: promotion?.cardImage?.full,
      fullPhoto: promotion?.pageImage?.full,
      start: promotion?.start || new Date(),
      end: promotion?.end || new Date(),
      discount: promotion?.discount || 0,
      productIdList: promotion?.products.map(it => it.id) || [],
      isIndexed: !!promotion?.pageMeta.isIndexed,
      metaTitle: promotion?.pageMeta.metaTitle.ru || '',
      metaDescription: promotion?.pageMeta.metaDescription.ru || '',
      metaKeywords: promotion?.pageMeta.metaKeywords.ru || '',
    };

    setDefaultValues(values);
  }, [promotion]);

  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const submitStockForm = () => submitBtnRef?.current?.click();

  const categories =
    categoriesData?.map(it => ({
      label: it.title.ru,
      value: it.key,
    })) || [];

  const products =
    productsData?.products.map(it => ({
      id: it.id,
      title: it.title.ru,
      image: it.images[0]?.small || noImage,
      category: it.category?.key,
      characteristics: it.characteristics,
    })) || [];

  const goToStocks = () => to(Path.STOCKS);

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

  const save = async (data: CreateStockFormDto) => {
    const cardImage =
      typeof data.smallPhoto === 'string'
        ? promotion?.cardImage
        : await uploadPicture(data.smallPhoto, '1:1');
    const pageImage =
      typeof data.fullPhoto === 'string'
        ? promotion?.pageImage
        : await uploadPicture(data.fullPhoto, '1:2');

    const updatedPromotion: PromotionUpdateDto = {
      id: Number(id),
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
      await updatePromotion(updatedPromotion).unwrap();

      eventBus.emit(EventTypes.notification, {
        message: 'Акция изменена',
        type: NotificationType.SUCCESS,
      });

      goToStocks();
    } catch (error) {
      eventBus.emit(EventTypes.notification, {
        message: 'Не удалось создать акцию',
        type: NotificationType.DANGER,
      });
    }
  };

  if (isLoading) return <ProgressLinear variant="query" />;

  if (!isLoading && isError) {
    return <Typography variant="h5">Произошла ошибка</Typography>;
  }

  if (!isLoading && !isError && !promotion) {
    return <Typography variant="h5">Акция не найдена</Typography>;
  }

  return (
    <div>
      <Header
        leftTitle="Редактирование акции"
        rightContent={<RightContent onCancel={goToStocks} onSave={submitStockForm} />}
      />

      <CreateStockForm
        key={`stock-create/${id}`}
        products={products}
        categories={categories}
        defaultValues={defaultValues}
        submitBtnRef={submitBtnRef}
        onChange={save}
      />
    </div>
  );
}

export default CreateStockView;
