export type ProductBasicSettingsFormDto = Readonly<{
  categoryKey: string;
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  isIndexed: boolean;
  metaKeywords: string;
}>;
