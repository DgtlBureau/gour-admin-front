export type ProductBasicSettingsFormDto = Readonly<{
  category: 'meat' | 'cheese';
  title: string;
  metaTitle: string;
  metaDescription: string;
  isIndexed: boolean;
  metaKeywords: string;
}>;
