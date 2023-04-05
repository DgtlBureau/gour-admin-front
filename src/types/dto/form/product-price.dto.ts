type ProductPriceFormDiscountsDto = Record<string, number | undefined>;

export type ProductPriceFormDto = Readonly<
  ProductPriceFormDiscountsDto & {
    cheeseCoin: number;
    individual: number;
    company: number;
    companyByCash: number;
  }
>;
