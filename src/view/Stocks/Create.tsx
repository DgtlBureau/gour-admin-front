import React, { useState, useRef } from 'react';
import { formatISO } from 'date-fns';
import { SingleValue } from 'react-select';

import { CreateStockForm } from '../../components/Stock/CreateForm/CreateForm';
import { Header } from '../../components/Header/Header';
import { Button } from '../../components/UI/Button/Button';
import { Path } from '../../constants/routes';
import { Select, SelectOption } from '../../components/UI/Select/Select';
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

const emptyTranslatableString = {
  ru: '',
  en: '',
};

const emptyTranslatableImage = {
  ru: -1,
  en: -1,
};

type Language = 'ru' | 'en';

const selectOptions = [
  {
    value: 'ru',
    label: 'Русский',
  },
  {
    value: 'en',
    label: 'English',
  },
] as { value: Language, label: string }[];

type TranslatableStockValues = {
  title: string;
  description: string;
  smallPhoto: File;
  fullPhoto: File;
  metaTitle?: string | undefined;
  metaDescription?: string | undefined;
  metaKeywords?: string | undefined;
};

type CommonStockValues = {
  startDate: Date;
  endDate: Date;
  stockPercent: string;
  productIdList: number[];
  isIndexed?: boolean;
}

type StockFormValues = {
  ru: TranslatableStockValues,
  en: TranslatableStockValues,
  common: CommonStockValues,
};

type RightContentProps = {
  language: Language;
  onChangeLanguage(option: SingleValue<SelectOption<Language>>): void;
  onSave(): void;
  onCancel(): void;
};

function RightContent({ language, onChangeLanguage, onSave, onCancel }: RightContentProps) {
  return (
    <>
      <Select
        sx={{ width: '150px' }}
        value={language}
        options={selectOptions}
        onChange={onChangeLanguage}
        isMulti={false}
      />
      <Button sx={{ margin: '0 10px' }} onClick={onSave}>
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

  const { data: productsData } = useGetAllProductsQuery({
    withSimilarProducts: false,
    withMeta: false,
    withRoleDiscount: false,
  });
  const { data: categoriesData } = useGetAllCategoriesQuery();

  const [uploadImage, { data: imageData }] = useUploadImageMutation();
  const [createPromotion] = useCreatePromotionMutation();

  const [language, setLanguage] = useState<Language>('ru');
  const [stockValues, setStockValues] = useState({} as StockFormValues);

  const submitBtnRef = useRef<HTMLButtonElement>(null);

  const categories = categoriesData?.map(it => ({
    label: it.title.ru,
    value: it.key,
  })) || [];

  const products = productsData?.products.map(it => ({
    id: it.id,
    title: it.title.ru,
    image: it.images[0]?.small || noImage,
    category: it.category.key,
    characteristics: it.characteristics,
  })) || [];

  const goToStocks = () => to(Path.STOCKS);

  const rememberValues = (data: CreateStockFormDto) => {
    console.log('remember values');

    const commonValues: CommonStockValues = {
      startDate: data.startDate,
      endDate: data.endDate,
      stockPercent: data.stockPercent,
      productIdList: data.productIdList,
      isIndexed: data.isIndexed,
    };

    const translatableValues: TranslatableStockValues = {
      title: data.title,
      description: data.description,
      smallPhoto: data.smallPhoto,
      fullPhoto: data.fullPhoto,
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
      metaKeywords: data.metaKeywords,
    };

    const updatedValues = {
      ...stockValues,
      [language]: translatableValues,
      common: commonValues,
    };

    setStockValues(updatedValues);
  };

  const uploadPhoto = async (image: File, label?: string) => {
    if (!image) return undefined;

    const formData = new FormData();

    formData.append('image', image);

    try {
      await uploadImage(formData).unwrap();
    } catch (error) {
      const languageLabel = language === 'ru' ? 'Русский' : 'English';

      eventBus.emit(EventTypes.notification, {
        message: `Произошла ошибка при загрузке фото ${label} (${languageLabel})`,
        type: NotificationType.DANGER,
      });
    }

    return imageData;
  };

  const convertToStock = async (values: StockFormValues) => {
    const ruCardImage = await uploadPhoto(values.ru.smallPhoto);
    const enCardImage = await uploadPhoto(values.en.smallPhoto);

    const ruPageImage = await uploadPhoto(values.ru.fullPhoto);
    const enPageImage = await uploadPhoto(values.en.fullPhoto);

    return {
      title: {
        ...emptyTranslatableString,
        ru: values.ru.title,
        en: values.en.title,
      },
      description: {
        ...emptyTranslatableString,
        ru: values.ru.description,
        en: values.en.description,
      },
      cardImageId: {
        ...emptyTranslatableImage,
        ru: ruCardImage?.id,
        en: enCardImage?.id,
      },
      pageImageId: {
        ...emptyTranslatableImage,
        ru: ruPageImage?.id,
        en: enPageImage?.id,
      },
      discount: +values.common.stockPercent,
      start: formatISO(values.common.startDate),
      end: formatISO(values.common.endDate),
      products: values.common.productIdList,
      pageMeta: {
        metaTitle: {
          ...emptyTranslatableString,
          ru: values.ru.metaTitle,
          en: values.en.metaTitle,
        },
        metaDescription: {
          ...emptyTranslatableString,
          ru: values.ru.metaDescription,
          en: values.en.metaDescription,
        },
        metaKeywords: {
          ...emptyTranslatableString,
          ru: values.ru.metaKeywords,
          en: values.en.metaKeywords,
        },
        isIndexed: values.common.isIndexed,
      },
    } as PromotionCreateDto;
  };

  const submitStockForm = () => {
    console.log('submit form');
    submitBtnRef?.current?.click();
  };

  const selectLanguage = (option: SingleValue<SelectOption<Language>>) => {
    console.log('language change');
    submitStockForm();

    if (option) setLanguage(option.value);
  };

  const save = async () => {
    submitStockForm();

    const stock = await convertToStock(stockValues);

    try {
      await createPromotion(stock).unwrap();
      eventBus.emit(EventTypes.notification, {
        message: 'Акция создана',
        type: NotificationType.SUCCESS,
      });
      to(Path.STOCKS);
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
        rightContent={(
          <RightContent
            language={language}
            onChangeLanguage={selectLanguage}
            onSave={save}
            onCancel={goToStocks}
          />
        )}
      />
      <CreateStockForm
        key={`stock-create/${language}`}
        products={products}
        categories={categories}
        defaultValues={{ ...stockValues[language], ...stockValues.common }}
        submitBtnRef={submitBtnRef}
        onSubmit={rememberValues}
      />
    </div>
  );
}

export default CreateStockView;
