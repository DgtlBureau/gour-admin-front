import { PagesAboutFormDto } from 'types/dto/form/pages-about.dto';
import { PageCreateDto } from 'types/dto/page/create.dto';
import { PageUpdateDto } from 'types/dto/page/update.dto';
import { Page } from 'types/entities/Page';

const emptyLanguages = {
  ru: '',
  en: '',
};

export const convertPageForCreate = (
  tabValue: string,
  page: PagesAboutFormDto,
  language: 'ru' | 'en',
): PageCreateDto => ({
  key: tabValue,
  info: {
    title: {
      ...emptyLanguages,
      [language]: page.title,
    },
    description: {
      ...emptyLanguages,
      [language]: page.description,
    },
  },
  meta: {
    metaTitle: {
      ...emptyLanguages,
      [language]: page.metaTitle,
    },
    metaDescription: {
      ...emptyLanguages,
      [language]: page.metaDescription,
    },
    metaKeywords: {
      ...emptyLanguages,
      [language]: page.metaKeywords,
    },
    isIndexed: !!page.isIndexed,
  },
});

export const convertPageForUpdate = (
  tabValue: string,
  currentPage: Page,
  page: PagesAboutFormDto,
  language: 'ru' | 'en',
): PageUpdateDto => ({
  id: currentPage.id,
  key: tabValue,
  info: {
    title: {
      ru: currentPage.info.title.ru,
      en: currentPage.info.title.en,
      [language]: page.title,
    },
    description: {
      ru: currentPage.info.title.ru,
      en: currentPage.info.title.en,
      [language]: page.description,
    },
  },
  meta: {
    metaTitle: {
      ru: currentPage.meta.metaTitle.ru,
      en: currentPage.meta.metaTitle.en,
      [language]: page.metaTitle,
    },
    metaDescription: {
      ru: currentPage.meta.metaDescription.ru,
      en: currentPage.meta.metaDescription.en,
      [language]: page.metaDescription,
    },
    metaKeywords: {
      ru: currentPage.meta.metaKeywords.ru,
      en: currentPage.meta.metaKeywords.en,
      [language]: page.metaKeywords,
    },
    isIndexed: !!page.isIndexed,
  },
});
