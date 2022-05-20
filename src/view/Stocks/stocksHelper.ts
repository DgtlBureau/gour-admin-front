import { formatISO } from 'date-fns';

import { CreateStockFormDto } from '../../@types/dto/form/create-stock.dto';
import { Image } from '../../@types/entities/Image';
import { Language } from '../../@types/entities/Language';

export type TranslatableStockValues = {
  title: string;
  description: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
};

export type CommonStockValues = {
  start: Date;
  end: Date;
  discount: number;
  productIdList: number[];
  isIndexed?: boolean;
}

type StockImages = {
  card: Image;
  page: Image;
};

export type StockFormValues = {
  ru: TranslatableStockValues,
  en: TranslatableStockValues,
  common: CommonStockValues,
  images: StockImages,
};

export const convertToStockValues = (
  data: CreateStockFormDto,
  images: StockImages,
  language: Language,
) => {
  const commonValues: CommonStockValues = {
    start: data.start,
    end: data.end,
    discount: data.discount,
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

  return { [language]: translatableValues, common: commonValues, images };
};

export const convertToStock = (values: StockFormValues) => (
  {
    title: {
      ru: values.ru.title,
      en: values.en.title,
    },
    description: {
      ru: values.ru.description,
      en: values.en.description,
    },
    cardImageId: values.images.card.id,
    pageImageId: values.images.page.id,
    discount: values.common.discount,
    start: formatISO(values.common.start),
    end: formatISO(values.common.end),
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
  }
);
