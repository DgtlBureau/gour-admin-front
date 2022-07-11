export type CreateStockFormDto = Readonly<{
  title: string;
  description: string;
  smallPhoto?: File | string;
  fullPhoto?: File | string;
  start: Date;
  end: Date;
  discount: number;
  productIdList: number[];
  isIndexed?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}>;
