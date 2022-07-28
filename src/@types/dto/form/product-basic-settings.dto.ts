export type ProductBasicSettingsFormDto = Readonly<{
  categoryKey: string;
  title: string;
  description: string;
  metaTitle: string;
  firstImage?: File | string;
  secondImage?: File | string;
  thirdImage?: File | string;
  metaDescription: string;
  isIndexed: boolean;
  metaKeywords: string;
}>;
