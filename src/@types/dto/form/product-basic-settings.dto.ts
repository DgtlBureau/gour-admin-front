export type ProductBasicSettingsFormDto = Readonly<{
  categoryKey: string;
  title: string;
  description: string;
  metaTitle: string;
  firstImage?: string;
  secondImage?: string;
  thirdImage?: string;
  metaDescription: string;
  isIndexed: boolean;
  metaKeywords: string;
}>;
