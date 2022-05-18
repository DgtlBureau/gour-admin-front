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
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
};

type CommonStockValues = {
  startDate: Date;
  endDate: Date;
  stockPercent: string;
  smallPhoto: File;
  fullPhoto: File;
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

  const { data: productsData } = useGetAllProductsQuery({
    withSimilarProducts: false,
    withMeta: false,
    withRoleDiscount: false,
  });
  const { data: categoriesData } = useGetAllCategoriesQuery();

  const [uploadImage] = useUploadImageMutation();
  const [createPromotion] = useCreatePromotionMutation();

  const [language, setLanguage] = useState<Language>('ru');
  const [stockValues, setStockValues] = useState({} as StockFormValues);

  const [isValid, setIsValid] = useState({ ru: false, en: false });

  const submitBtnRef = useRef<HTMLButtonElement>(null);

  const defaultValues = { ...stockValues[language], ...stockValues.common };

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

  const submitStockForm = () => {
    console.log('submit');
    submitBtnRef?.current?.click();
  };

  const selectLanguage = (option: SingleValue<SelectOption<Language>>) => {
    if (!option) return;

    submitStockForm();

    if (!isValid[language]) {
      eventBus.emit(EventTypes.notification, {
        message: 'Необходимо заполнить данные для текущего языка',
        type: NotificationType.DANGER,
      });
      return;
    }

    setLanguage(option.value);

    console.log('language change');
  };

  const changeValidity = (value: boolean) => setIsValid({ ...isValid, [language]: value });

  const rememberValues = (data: CreateStockFormDto) => {
    console.log(data);

    const commonValues: CommonStockValues = {
      startDate: data.startDate,
      endDate: data.endDate,
      stockPercent: data.stockPercent,
      smallPhoto: data.smallPhoto,
      fullPhoto: data.fullPhoto,
      productIdList: data.productIdList,
      isIndexed: data.isIndexed,
    };

    const translatableValues: TranslatableStockValues = {
      title: data.title,
      description: data.description,
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

    eventBus.emit(EventTypes.notification, {
      message: 'Данные сохранены',
      type: NotificationType.SUCCESS,
    });

    console.log(stockValues);
  };

  const uploadPhoto = async (file?: File, label?: string) => {
    const formData = new FormData();

    formData.append('image', file || noImage);

    const image = await uploadImage(formData).unwrap();

    if (!image) {
      eventBus.emit(EventTypes.notification, {
        message: `Произошла ошибка при загрузке фото ${label})`,
        type: NotificationType.DANGER,
      });
    }

    return image;
  };

  const convertToStock = async (values: StockFormValues) => {
    const cardImage = await uploadPhoto(values.common.smallPhoto, '1:2');
    const pageImage = await uploadPhoto(values.common.fullPhoto, '1:1');

    return {
      title: {
        ru: values.ru.title,
        en: values.en.title,
      },
      description: {
        ru: values.ru.description,
        en: values.en.description,
      },
      cardImageId: cardImage.id,
      pageImageId: pageImage.id,
      discount: +values.common.stockPercent,
      start: formatISO(values.common.startDate),
      end: formatISO(values.common.endDate),
      products: values.common.productIdList,
      pageMeta: {
        metaTitle: {
          ru: values.ru.metaTitle,
          en: values.en.metaTitle,
        },
        metaDescription: {
          ru: values.ru.metaDescription,
          en: values.en.metaDescription,
        },
        metaKeywords: {
          ru: values.ru.metaKeywords,
          en: values.en.metaKeywords,
        },
        isIndexed: values.common.isIndexed,
      },
    } as PromotionCreateDto;
  };

  const save = async () => {
    submitStockForm();

    if (!isValid.ru || !isValid.en) {
      const invalidLanguages = selectOptions.filter(option => !isValid[option.value]).map(option => option.label);

      eventBus.emit(EventTypes.notification, {
        message: `Заполните данные для следующих языков: ${invalidLanguages.join(', ')}`,
        type: NotificationType.DANGER,
      });

      return;
    }

    const stock = await convertToStock(stockValues);

    console.log(stock);

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
            onCancel={goToStocks}
            onSave={save}
          />
        )}
      />
      <CreateStockForm
        key={`stock-create/${language}`}
        products={products}
        categories={categories}
        defaultValues={defaultValues}
        submitBtnRef={submitBtnRef}
        onValidation={changeValidity}
        onSubmit={rememberValues}
      />
    </div>
  );
}

export default CreateStockView;
