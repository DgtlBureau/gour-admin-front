export type ProductFilterCheeseFormDto = Readonly<{
  category: string;
  rennet: string;
  milk: string;
  country: string;
  crustType: string;
  timeOfOrigin: string;
}>;

export type ProductFilterMeatFormDto = Readonly<{
  country: string;
  productType: string;
  processingType: string;
  meatType: string;
  timeOfOrigin: string;
}>;
