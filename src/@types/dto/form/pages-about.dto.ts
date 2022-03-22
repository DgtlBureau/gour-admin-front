export type PagesAboutDto = Readonly<{
  pageTitle: string;
  description: string;
  indexation: 'yes' | 'no';
  title: string;
  metaTitle: string;
  keywords: string;
  metaKeywords: string;
}>;
