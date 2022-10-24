export type EditableCategory = {
  title: string;
  id?: number;
};

export type SubCategoriesState = Record<number, EditableCategory>;

export enum CategoryHasDiscount {
  YES = 'Yes',
  NO = 'No',
}

export type CreateFormType = {
  title: string;
  hasDiscount?: CategoryHasDiscount;
  subCategories?: SubCategoriesState;
};
