export type ProductBasicSettingsFormDto = Readonly<{
  category: number;
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  isIndexed: boolean;
  metaKeywords: string;
}>;
