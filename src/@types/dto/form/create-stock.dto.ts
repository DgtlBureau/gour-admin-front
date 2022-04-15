export type CreateStockFormDto = Readonly<{
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  stockPercent: string;
  productIdList: number[];
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}>;
