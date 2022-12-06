import { Base } from './Base';
import { LowLevelCategory } from './Category';

export type PromoCode = Base & {
  key: string;
  discount: number;
  end: string;
  totalCount: number;
  countForOne: number;
  categories: LowLevelCategory[];
};
