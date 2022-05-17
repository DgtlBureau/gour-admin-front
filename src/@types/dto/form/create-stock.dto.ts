export type CreateStockFormDto = Readonly<{
  title: string;
  description: string;
  smallPhoto: File;
  fullPhoto: File;
  startDate: Date;
  endDate: Date;
  stockPercent: string;
  productIdList: number[];
  isIndexed?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}>;
