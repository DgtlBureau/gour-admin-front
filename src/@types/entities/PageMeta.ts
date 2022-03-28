import { TranslatableString } from './TranslatableString';

export type PageMeta = {
  metaTitle: TranslatableString;
  metaDescription: TranslatableString;
  metaKeywords: TranslatableString;
  isIndexed: boolean;
};
