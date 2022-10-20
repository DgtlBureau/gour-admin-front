export type PagesAboutFormDto = Readonly<{
  title: string;
  description: string;
  isIndexed: boolean;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}>;
