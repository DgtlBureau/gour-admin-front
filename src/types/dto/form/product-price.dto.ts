type ProductPriceFormDiscountsDto = Record<string, number | undefined>;

export type ProductPriceFormDto = Readonly<
  ProductPriceFormDiscountsDto & {
    cheeseCoin: number;
  }
>;
