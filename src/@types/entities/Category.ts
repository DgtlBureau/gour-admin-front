import { TranslatableString } from './TranslatableString';
import { TranslatableText } from './TranslatableText';

export type Category = {
  id: number;
  key: string;
  title: TranslatableString;
  description: TranslatableText;
  icon: string;
};

type CategoryLayout<Sub extends unknown[] | unknown, Parent extends unknown[] | unknown> =
  {
    id: number;
    title: TranslatableString;
    parentCategories: Parent;
    subCategories: Sub;
  };

export type LowLevelCategory = CategoryLayout<null, null>;
export type MidLevelCategory = CategoryLayout<LowLevelCategory[], null>;
export type TopLevelCategory = CategoryLayout<MidLevelCategory[], unknown[]>;

export type NewCategory = TopLevelCategory | MidLevelCategory | LowLevelCategory;
