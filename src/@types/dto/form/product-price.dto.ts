export type ProductPriceFormDto = Readonly<{
  discount?: number;
  rub: number;
  eur: number;
  companyDiscountRub: number;
  companyDiscountEur: number;
  collectiveDiscountRub: number;
  collectiveDiscountEur: number;
}>;
