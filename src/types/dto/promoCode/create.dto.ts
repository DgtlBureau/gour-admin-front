export type PromoCodeCreateDto = {
  key: string;
  discount: number;
  end: string;
  totalCount: number;
  countForOne: number;
  categoryIds: number[];
};
