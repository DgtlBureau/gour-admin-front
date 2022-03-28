export type ProductGetOneDto = Readonly<{
  id: number;
  withSimilarProducts?: boolean;
  withMeta?: boolean;
  withRoleDiscount?: boolean;
}>;
