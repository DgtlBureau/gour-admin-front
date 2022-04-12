import { TranslatableString } from './TranslatableString';
import { TranslatableText } from './TranslatableText';

export type Category = {
  id: number;
  title: TranslatableString;
  description: TranslatableText;
  icon: string;
};
