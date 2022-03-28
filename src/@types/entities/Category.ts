import { TranslatableString } from './TranslatableString';
import { TranslatableText } from './TranslatableText';

export type Category = {
  title: TranslatableString;
  description: TranslatableText;
  icon: string;
};
