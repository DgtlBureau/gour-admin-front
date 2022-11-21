import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { TopLevelCategory } from 'types/entities/Category';

import { generateMockId } from 'utils/wordHelper';

import { CreateStockForm } from './CreateForm';

export default {
  title: 'CreateStockForm',
  component: CreateStockForm,
} as ComponentMeta<typeof CreateStockForm>;

function createProduct(id: number, title: string, image: string, category: string, categories: TopLevelCategory[]) {
  return {
    id,
    title,
    category,
    image,
    categories,
  };
}

const meatCategory = {
  id: generateMockId(),
  title: {
    ru: 'Мясо',
    en: 'Мясо',
  },
  parentCategories: [],
  subCategories: [],
};

const cheeseCategory = {
  id: generateMockId(),
  title: {
    ru: 'Сыр',
    en: 'Сыр',
  },
  parentCategories: [],
  subCategories: [],
};

const Template: ComponentStory<typeof CreateStockForm> = args => <CreateStockForm {...args} />;

export const DefaultState = Template.bind({});
DefaultState.args = {
  products: [
    {
      categories: [],
      category: '',
      id: 1,
      image: '',
      title: '',
    },
    createProduct(
      1,
      'Какое-то мясо',
      'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      'meat',
      [meatCategory, cheeseCategory],
    ),
    createProduct(
      2,
      'Какой-то сыр',
      'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1773&q=80',
      'cheese',
      [meatCategory, cheeseCategory],
    ),
    createProduct(
      3,
      'Крутой сыр (вкусный)',
      'https://images.unsplash.com/photo-1589881133595-a3c085cb731d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80',
      'cheese',
      [meatCategory, cheeseCategory],
    ),
    createProduct(
      4,
      'Неплохой сыр (вроде вкусный)',
      'https://images.unsplash.com/photo-1452195100486-9cc805987862?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80',
      'cheese',
      [meatCategory, cheeseCategory],
    ),
    createProduct(
      5,
      'Вкусное мясо',
      'https://images.unsplash.com/photo-1628543108325-1c27cd7246b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
      'meat',
      [meatCategory, cheeseCategory],
    ),
    createProduct(
      6,
      'Chevrano XO Козий Элитный Сыр',
      'https://images.unsplash.com/photo-1609359672052-ef0cefc88e03?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80',
      'cheese',
      [meatCategory, cheeseCategory],
    ),
  ],
  categories: [],
};
