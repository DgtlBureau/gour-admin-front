import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SingleValue } from 'react-select';

import {
  StockFormValues,
  CommonStockValues,
  TranslatableStockValues,
  convertToStockValues,
  convertToStock,
} from './stocksHelper';
import { CreateStockForm } from '../../components/Stock/CreateForm/CreateForm';
import { Header } from '../../components/Header/Header';
import { Button } from '../../components/UI/Button/Button';
import { Path } from '../../constants/routes';
import { Select, SelectOption } from '../../components/UI/Select/Select';
import { useTo } from '../../hooks/useTo';
import { useGetAllProductsQuery } from '../../api/productApi';
import { useGetAllCategoriesQuery } from '../../api/categoryApi';
import { useGetPromotionByIdQuery, useUpdatePromotionMutation } from '../../api/promotionApi';
import { useUploadImageMutation } from '../../api/imageApi';
import { eventBus, EventTypes } from '../../packages/EventBus';
import { NotificationType } from '../../@types/entities/Notification';
import { CreateStockFormDto } from '../../@types/dto/form/create-stock.dto';
import { Language } from '../../@types/entities/Language';

import noImage from '../../assets/images/no-image.svg';

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

  const { id } = useParams();

  const { data: productsData } = useGetAllProductsQuery({
    withSimilarProducts: false,
    withMeta: false,
    withRoleDiscount: false,
  });
  const { data: categoriesData } = useGetAllCategoriesQuery();
  const { data: promotion } = useGetPromotionByIdQuery(Number(id));

  const [updatePromotion] = useUpdatePromotionMutation();
  const [uploadImage] = useUploadImageMutation();

  const [language, setLanguage] = useState<Language>('ru');
  const [stockValues, setStockValues] = useState({} as StockFormValues);
  const [languageForChange, setLanguageForChange] = useState<Language | null>(null);

  const [isValid, setIsValid] = useState({ ru: true, en: true });

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

  useEffect(() => {
    if (promotion) {
      const commonValues: CommonStockValues = {
        startDate: promotion.start,
        endDate: promotion.end,
        stockPercent: String(promotion.discount),
        smallPhoto: promotion.cardImage,
        fullPhoto: promotion.pageImage,
        productIdList: promotion.productIdList,
        isIndexed: promotion.meta.isIndexed,
      };

      const ruValues: TranslatableStockValues = {
        title: promotion.title.ru,
        description: promotion.description.ru,
        metaTitle: promotion.meta.metaTitle.ru,
        metaDescription: promotion.meta.metaDescription.ru,
        metaKeywords: promotion.meta.metaKeywords.ru,
      };

      const enValues: TranslatableStockValues = {
        title: promotion.title.en,
        description: promotion.description.en,
        metaTitle: promotion.meta.metaTitle.en,
        metaDescription: promotion.meta.metaDescription.en,
        metaKeywords: promotion.meta.metaKeywords.en,
      };

      setStockValues({ common: commonValues, ru: ruValues, en: enValues });
    }
  }, [promotion]);

  const goToStocks = () => to(Path.STOCKS);

  const submitStockForm = () => submitBtnRef?.current?.click();

  const uploadPhoto = async (file: File, label?: string) => {
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

    setLanguageForChange(option.value);
  };

  useEffect(() => {
    if (languageForChange) {
      setLanguage(languageForChange);
      setLanguageForChange(null);
    }
  }, [stockValues]);

  const changeStockValues = (data: CreateStockFormDto) => {
    const newStockValues = convertToStockValues(data, language);

    const updatedStockValues = { ...stockValues, ...newStockValues };

    setStockValues(updatedStockValues);
  };

  const changeValidity = (value: boolean) => setIsValid({ ...isValid, [language]: value });

  const getStock = async () => {
    const cardImage = await uploadPhoto(stockValues.common.smallPhoto, '1:2');
    const pageImage = await uploadPhoto(stockValues.common.fullPhoto, '1:1');

    return convertToStock(stockValues, { card: cardImage, page: pageImage });
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

    const stock = await getStock();

    try {
      await updatePromotion({ id: Number(id), stock }).unwrap();
      eventBus.emit(EventTypes.notification, {
        message: 'Акция обновлена',
        type: NotificationType.SUCCESS,
      });
      to(Path.STOCKS);
    } catch (error) {
      eventBus.emit(EventTypes.notification, {
        message: 'Не удалось обновить акцию',
        type: NotificationType.DANGER,
      });
    }
  };

  return (
    <div>
      <Header
        leftTitle="Редактирование акции"
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
        onValidityChange={changeValidity}
        onSubmit={changeStockValues}
      />
    </div>
  );
}

export default CreateStockView;
