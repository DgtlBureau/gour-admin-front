import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { LowLevelCategory, MidLevelCategory } from '../../../@types/entities/Category';
import { CategoriesTable } from './Table';

export default {
  title: 'Tables/Categories',
  component: CategoriesTable,
} as ComponentMeta<typeof CategoriesTable>;

const Template: ComponentStory<typeof CategoriesTable> = function (args) {
  return <CategoriesTable {...args} />;
};

type SubCategories = Array<MidLevelCategory | LowLevelCategory> | null;
function generateCategories<
  P extends unknown[] | null = null,
  S extends SubCategories = null
>(id: number, title: { en: string; ru: string }, parentCategories: P, subCategories: S) {
  return {
    id,
    title,
    parentCategories,
    subCategories,
  };
}

const midGeneralCategory = generateCategories(
  3,
  { ru: 'Твердость', en: 'Твердость' },
  null,
  [
    generateCategories(5, { ru: 'Твердый', en: 'Твердый' }, null, null),
    generateCategories(6, { ru: 'Мягкий', en: 'Мягкий' }, null, null),
    generateCategories(7, { ru: 'Полутвёрдый', en: 'Полутвёрдый' }, null, null),
  ]
);

export const DefaultState = Template.bind({});
DefaultState.args = {
  categories: [
    generateCategories(
      1,
      { ru: 'Сыр', en: 'Сыр' },
      [],
      [
        midGeneralCategory,
        generateCategories(4, { ru: 'С плесенью', en: 'С плесенью' }, null, [
          generateCategories(8, { ru: 'Да', en: 'Да' }, null, null),
          generateCategories(9, { ru: 'Нет', en: 'Нет' }, null, null),
        ]),
      ]
    ),
    generateCategories(2, { ru: 'Мясо', en: 'Мясо' }, [], [midGeneralCategory]),
  ],
};
