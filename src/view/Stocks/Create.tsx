import React, { useRef } from 'react';
import { formatISO } from 'date-fns';

import { CreateStockForm } from '../../components/Stock/CreateForm/CreateForm';
import { Header } from '../../components/Header/Header';
import { Button } from '../../components/UI/Button/Button';
import { Path } from '../../constants/routes';
import { useTo } from '../../hooks/useTo';
import { useGetAllProductsQuery } from '../../api/productApi';
import { useGetAllCategoriesQuery } from '../../api/categoryApi';
import { useCreatePromotionMutation } from '../../api/promotionApi';
import { useUploadImageMutation } from '../../api/imageApi';
import { eventBus, EventTypes } from '../../packages/EventBus';
import { NotificationType } from '../../@types/entities/Notification';
import { CreateStockFormDto } from '../../@types/dto/form/create-stock.dto';
import { PromotionCreateDto } from '../../@types/dto/promotion/create.dto';

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
  const to = useTo();

  const { data: productsData } = useGetAllProductsQuery({});
  const { data: categoriesData } = useGetAllCategoriesQuery();

  const [createPromotion] = useCreatePromotionMutation();
  const [uploadImage] = useUploadImageMutation();

  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const submitStockForm = () => submitBtnRef?.current?.click();

  const categories =
    categoriesData?.map(it => ({
      label: it.title.ru,
      value: it.id,
    })) || [];

  const products =
    productsData?.products?.map(it => ({
      id: it.id,
      title: it.title.ru,
      image: it.images[0]?.small || noImage,
      category: it.category?.key,
      categories: it.categories,
      // characteristics: it.characteristics,
    })) || [];

  const goToStocks = () => to(Path.STOCKS);

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

  const save = async (data: CreateStockFormDto) => {
    const cardImage = await uploadPicture(data.smallPhoto, '1:1');
    const pageImage = await uploadPicture(data.fullPhoto, '1:2');

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

      goToStocks();
    } catch (error) {
      eventBus.emit(EventTypes.notification, {
        message: 'Не удалось создать акцию',
        type: NotificationType.DANGER,
      });
    }
  };

  return (
    <div>
      <Header
        leftTitle="Создание акции"
        rightContent={<RightContent onCancel={goToStocks} onSave={submitStockForm} />}
      />
      <CreateStockForm
        products={products}
        categories={categories}
        submitBtnRef={submitBtnRef}
        onChange={save}
      />
    </div>
  );
}

export default CreateStockView;
