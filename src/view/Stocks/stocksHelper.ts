import { formatISO } from 'date-fns';

import { CreateStockFormDto } from '../../@types/dto/form/create-stock.dto';
import { PromotionCreateDto } from '../../@types/dto/promotion/create.dto';
import { Image } from '../../@types/entities/Image';

export type TranslatableStockValues = {
  title: string;
  description: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
};

export type CommonStockValues = {
  startDate: Date;
  endDate: Date;
  stockPercent: string;
  smallPhoto: File;
  fullPhoto: File;
  productIdList: number[];
  isIndexed?: boolean;
}

export type StockFormValues = {
  ru: TranslatableStockValues,
  en: TranslatableStockValues,
  common: CommonStockValues,
};

export const convertToStockValues = (data: CreateStockFormDto, language: 'ru' | 'en') => {
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

  return { [language]: translatableValues, common: commonValues };
};

export const convertToStock = (values: StockFormValues, images: { card: Image, page: Image }) => (
  {
    title: {
      ru: values.ru.title,
      en: values.en.title,
    },
    description: {
      ru: values.ru.description,
      en: values.en.description,
    },
    cardImageId: images.card.id,
    pageImageId: images.page.id,
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
  } as PromotionCreateDto
);
