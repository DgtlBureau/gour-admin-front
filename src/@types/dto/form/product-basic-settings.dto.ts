export type ProductBasicSettingsFormDto = Readonly<{
  categoryKey: string;
  title: string;
  description: string;
  metaTitle: string;
  firstImage?: File;
  secondImage?: File;
  thirdImage?: File;
  metaDescription: string;
  isIndexed: boolean;
  metaKeywords: string;
}>;
