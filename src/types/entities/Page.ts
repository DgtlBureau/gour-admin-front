import { Image } from './Image';
import { Meta } from './Meta';
import { TranslatableString } from './TranslatableString';

export type Page = {
  id: number;
  key: string;
  info: {
    title: TranslatableString;
    description: TranslatableString;
  };
  bannerImg?: Image;
  meta: Meta;
};
