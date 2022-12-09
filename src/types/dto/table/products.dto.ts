export type ProductTableDto = Readonly<{
  id: number;
  image: string;
  title: string;
  categoriesIds: number[];
  price: number;
}>;
