export type CreateStockFormDto = Readonly<{
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  stockPercent: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
}>;
