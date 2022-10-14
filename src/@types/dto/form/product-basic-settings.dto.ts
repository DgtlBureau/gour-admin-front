export type ProductBasicSettingsFormDto = Readonly<{
  productType: number | null;
  title: string;
  description: string;
  metaTitle: string;
  firstImage?: File | string;
  secondImage?: File | string;
  thirdImage?: File | string;
  metaDescription: string;
  isIndexed: boolean;
  metaKeywords: string;
  moyskladId: string;
}>;
