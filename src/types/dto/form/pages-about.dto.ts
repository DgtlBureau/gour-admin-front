export type PagesAboutFormDto = Readonly<{
  title: string;
  description: string;
  isIndexed: boolean;
  bannerImg?: File | string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}>;
