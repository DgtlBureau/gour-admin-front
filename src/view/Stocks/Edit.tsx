import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { formatISO } from 'date-fns';

import { useGetAllCategoriesQuery } from 'api/categoryApi';
import { useUploadImageMutation } from 'api/imageApi';
import { useGetAllProductsQuery } from 'api/productApi';
import { useGetPromotionByIdQuery, useUpdatePromotionMutation } from 'api/promotionApi';

import { Header } from 'components/Header/Header';
import { CreateStockForm } from 'components/Stock/CreateForm/CreateForm';
import { Button } from 'components/UI/Button/Button';
import { ProgressLinear } from 'components/UI/ProgressLinear/ProgressLinear';
import { Typography } from 'components/UI/Typography/Typography';

import { CreateStockFormDto } from 'types/dto/form/create-stock.dto';
import { PromotionUpdateDto } from 'types/dto/promotion/update.dto';
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

function EditStockView() {
  const { id } = useParams();

  const { toStockList } = useTo();

  const { products } = useGetAllProductsQuery(
    { withCategories: true },
    {
      selectFromResult: ({ data }) => ({
        products:
          data?.products.map(it => ({
            id: it.id,
            title: it.title.ru,
            image: it.images[0]?.small || defaultImage,
            categories: it.categories,
          })) || [],
      }),
    },
  );
  const { data: categories = [] } = useGetAllCategoriesQuery();
  const { data: promotion, isLoading, isError } = useGetPromotionByIdQuery(Number(id));

  const [updatePromotion] = useUpdatePromotionMutation();
  const [uploadImage] = useUploadImageMutation();

  const [defaultValues, setDefaultValues] = useState<CreateStockFormDto | undefined>(undefined);

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
      metaTitle: promotion?.pageMeta.metaTitle?.ru || '',
      metaDescription: promotion?.pageMeta.metaDescription?.ru || '',
      metaKeywords: promotion?.pageMeta.metaKeywords?.ru || '',
    };

    setDefaultValues(values);
  }, [promotion]);

  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const submitStockForm = () => submitBtnRef?.current?.click();

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

  const save = async (data: CreateStockFormDto) => {
    const cardImage =
      typeof data.smallPhoto === 'string'
        ? promotion?.cardImage
        : data.smallPhoto && (await uploadPicture(data.smallPhoto));
    const pageImage =
      typeof data.fullPhoto === 'string'
        ? promotion?.pageImage
        : data.fullPhoto && (await uploadPicture(data.fullPhoto));

    const updatedPromotion: PromotionUpdateDto = {
      id: Number(id),
      title: {
        ru: data.title,
        en: '',
      },
      description: {
        ru: data.description || '',
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

      toStockList();
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

  if (!isLoading && !isError && !promotion) {
    return <Typography variant='h5'>Акция не найдена</Typography>;
  }

  return (
    <div>
      <Header
        leftTitle='Редактирование акции'
        rightContent={<RightContent onCancel={toStockList} onSave={submitStockForm} />}
      />

      <CreateStockForm
        key={`stock-create/${id}`}
        products={products}
        categories={categories || []}
        defaultValues={defaultValues}
        submitBtnRef={submitBtnRef}
        onChange={save}
      />
    </div>
  );
}

export default EditStockView;
