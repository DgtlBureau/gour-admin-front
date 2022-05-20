export type CreateStockFormDto = Readonly<{
  title: string;
  description: string;
  cardImage: File | string;
  pageImage: File | string;
  start: Date;
  end: Date;
  discount: number;
  productIdList: number[];
  isIndexed?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}>;
