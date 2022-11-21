export type ProductGetListDto = Readonly<{
  withSimilarProducts?: boolean;
  withMeta?: boolean;
  withRoleDiscount?: boolean;
  withCategories?: boolean;
  length?: number;
  offset?: number;
}>;
