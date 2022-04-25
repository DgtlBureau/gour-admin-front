export type ProductBasicSettingsFormDto = Readonly<{
  category: 'meat' | 'cheese';
  title: string;
  metaTitle: string;
  firstImage?: string;
  secondImage?: string;
  thirdImage?: string;
  metaDescription: string;
  isIndexed: boolean;
  metaKeywords: string;
}>;
