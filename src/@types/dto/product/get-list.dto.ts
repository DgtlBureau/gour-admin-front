export type ProductGetListDto = Readonly<{
  withSimilarProducts?: boolean;
  withMeta?: boolean;
  withRoleDiscount?: boolean;
  length?: number;
  offset?: number;
}>;
