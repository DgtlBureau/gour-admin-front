import { TranslatableString } from 'types/entities/TranslatableString';
import { TranslatableText } from 'types/entities/TranslatableText';

export type Category = {
  id: number;
  key: string;
  title: TranslatableString;
  description: TranslatableText;
  icon: string;
};

type CategoryLayout<Sub = unknown, Parent = unknown> = {
  id: number;
  title: TranslatableString;
  parentCategories: Parent;
  subCategories: Sub;
};

export type LowLevelCategory = CategoryLayout<null, null>;
export type MidLevelCategory = CategoryLayout<LowLevelCategory[], null>;
export type TopLevelCategory = CategoryLayout<MidLevelCategory[], unknown[]>;

export type AnyLevelCategory = LowLevelCategory | MidLevelCategory | TopLevelCategory;

export type CategoryWithParents = CategoryLayout<unknown, CategoryLayout[]>;
