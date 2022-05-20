import React, { useState, useRef, useEffect } from 'react';
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
import { StockFormValues, convertToStockValues, convertToStock } from './stocksHelper';
import { languages } from '../../constants/languages';
import { NotificationType } from '../../@types/entities/Notification';
import { CreateStockFormDto } from '../../@types/dto/form/create-stock.dto';
import { PromotionCreateDto } from '../../@types/dto/promotion/create.dto';
import { Language } from '../../@types/entities/Language';

import noImage from '../../assets/images/no-image.svg';

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
        options={languages}
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

  const [createPromotion] = useCreatePromotionMutation();
  const [uploadImage] = useUploadImageMutation();

  const [language, setLanguage] = useState<Language>('ru');
  const [stockValues, setStockValues] = useState({} as StockFormValues);
  const [languageForChange, setLanguageForChange] = useState<Language | null>(null);

  const [isValid, setIsValid] = useState({ ru: false, en: false });

  const submitBtnRef = useRef<HTMLButtonElement>(null);

  const defaultValues = {
    ...stockValues[language],
    ...stockValues.common,
    cardImage: stockValues.images?.card.full,
    pageImage: stockValues.images?.page.full,
  };

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

  const submitStockForm = () => submitBtnRef?.current?.click();

  const changeValidity = (value: boolean) => setIsValid({ ...isValid, [language]: value });

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

  const uploadPicture = async (file: File, label?: string) => {
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

  const changeStockValues = async (data: CreateStockFormDto) => {
    const cardImage = typeof data.cardImage !== 'string' && await uploadPicture(data.cardImage, '1:1');
    const pageImage = typeof data.pageImage !== 'string' && await uploadPicture(data.pageImage, '1:2');

    if (!cardImage || !pageImage) return;

    const images = { card: cardImage, page: pageImage };

    const newStockValues = convertToStockValues(data, images, language);

    const updatedStockValues = { ...stockValues, ...newStockValues };

    setStockValues(updatedStockValues);
  };

  const save = async () => {
    submitStockForm();

    if (!isValid.ru || !isValid.en) {
      const invalidLanguages = languages.filter(option => !isValid[option.value]).map(option => option.label);

      eventBus.emit(EventTypes.notification, {
        message: `Заполните данные для следующих языков: ${invalidLanguages.join(', ')}`,
        type: NotificationType.DANGER,
      });

      return;
    }

    const stock = convertToStock(stockValues);

    try {
      await createPromotion(stock as PromotionCreateDto).unwrap();
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

  useEffect(() => {
    if (languageForChange) {
      setLanguage(languageForChange);
      setLanguageForChange(null);
    }
  }, [stockValues]);

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
        onValidityChange={changeValidity}
        onSubmit={changeStockValues}
      />
    </div>
  );
}

export default CreateStockView;
